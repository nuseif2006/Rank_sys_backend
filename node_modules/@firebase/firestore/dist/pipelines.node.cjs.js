'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonB9spVcbo_node = require('./common-DW1GwHx2.node.cjs.js');
require('@firebase/app');
require('@firebase/util');
require('@firebase/webchannel-wrapper/bloom-blob');
require('@firebase/logger');
require('util');
require('crypto');
require('@grpc/grpc-js');
require('@grpc/proto-loader');
require('re2js');

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @deprecated use selectablesToObject instead
 * @param selectables
 */
function selectablesToMap(selectables) {
    return new Map(Object.entries(selectablesToObject(selectables)));
}
function selectablesToObject(selectables) {
    const result = {};
    for (const selectable of selectables) {
        let alias;
        let expression;
        if (typeof selectable === 'string') {
            alias = selectable;
            expression = commonB9spVcbo_node.field(selectable);
        }
        else if (selectable instanceof commonB9spVcbo_node.Field) {
            alias = selectable.alias;
            expression = selectable.expr;
        }
        else if (selectable instanceof commonB9spVcbo_node.AliasedExpression) {
            alias = selectable.alias;
            expression = selectable.expr;
        }
        else {
            commonB9spVcbo_node.fail(0x5319, { selectable });
        }
        if (result[alias] !== undefined) {
            throw new commonB9spVcbo_node.FirestoreError('invalid-argument', `Duplicate alias or field '${alias}'`);
        }
        result[alias] = expression;
    }
    return result;
}
function aliasedAggregateToMap(aliasedAggregatees) {
    return aliasedAggregatees.reduce((map, selectable) => {
        if (map.get(selectable.alias) !== undefined) {
            throw new commonB9spVcbo_node.FirestoreError('invalid-argument', `Duplicate alias or field '${selectable.alias}'`);
        }
        map.set(selectable.alias, selectable.aggregate);
        return map;
    }, new Map());
}
/**
 * Converts a value to an Expression, Returning either a Constant, MapFunction,
 * ArrayFunction, or the input itself (if it's already an expression).
 *
 * @private
 * @internal
 * @param value
 */
function vectorToExpr(value) {
    if (value instanceof commonB9spVcbo_node.Expression) {
        return value;
    }
    else if (value instanceof commonB9spVcbo_node.VectorValue) {
        const result = commonB9spVcbo_node.constant(value);
        return result;
    }
    else if (Array.isArray(value)) {
        const result = commonB9spVcbo_node.constant(commonB9spVcbo_node.vector(value));
        return result;
    }
    else {
        throw new Error('Unsupported value: ' + typeof value);
    }
}
/**
 * Converts a value to an Expression, Returning either a Constant, MapFunction,
 * ArrayFunction, or the input itself (if it's already an expression).
 * If the input is a string, it is assumed to be a field name, and a
 * field(value) is returned.
 *
 * @private
 * @internal
 * @param value
 */
function fieldOrExpression(value) {
    if (commonB9spVcbo_node.isString$1(value)) {
        const result = commonB9spVcbo_node.field(value);
        return result;
    }
    else {
        return valueToDefaultExpr(value);
    }
}
/**
 * Converts a value to an Expression, Returning either a Constant, MapFunction,
 * ArrayFunction, or the input itself (if it's already an expression).
 *
 * @private
 * @internal
 * @param value
 */
function valueToDefaultExpr(value) {
    let result;
    if (commonB9spVcbo_node.isFirestoreValue(value)) {
        return commonB9spVcbo_node.constant(value);
    }
    if (value instanceof commonB9spVcbo_node.Expression) {
        return value;
    }
    else if (commonB9spVcbo_node.isPlainObject(value)) {
        result = commonB9spVcbo_node.map(value);
    }
    else if (value instanceof Array) {
        result = commonB9spVcbo_node.array(value);
    }
    else if (isPipeline$1(value)) {
        result = commonB9spVcbo_node.pipelineValue(value);
    }
    else {
        result = commonB9spVcbo_node._constant(value, undefined);
    }
    return result;
}
/**
 * Checks if a value is a Pipeline object.
 *
 * We use duck typing here to avoid a circular dependency between pipeline.ts and pipeline_util.ts.
 */
function isPipeline$1(value) {
    return (typeof value === 'object' &&
        value !== null &&
        typeof value.toArrayExpression === 'function');
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * The Pipeline class provides a flexible and expressive framework for building complex data
 * transformation and query pipelines for Firestore.
 *
 * A pipeline takes data sources, such as Firestore collections or collection groups, and applies
 * a series of stages that are chained together. Each stage takes the output from the previous stage
 * (or the data source) and produces an output for the next stage (or as the final output of the
 * pipeline).
 *
 * Expressions can be used within each stage to filter and transform data through the stage.
 *
 * NOTE: The chained stages do not prescribe exactly how Firestore will execute the pipeline.
 * Instead, Firestore only guarantees that the result is the same as if the chained stages were
 * executed in order.
 *
 * @example
 * ```typescript
 * const db: Firestore; // Assumes a valid firestore instance.
 *
 * // Example 1: Select specific fields and rename 'rating' to 'bookRating'
 * const results1 = await execute(db.pipeline()
 *     .collection("books")
 *     .select("title", "author", field("rating").as("bookRating")));
 *
 * // Example 2: Filter documents where 'genre' is "Science Fiction" and 'published' is after 1950
 * const results2 = await execute(db.pipeline()
 *     .collection("books")
 *     .where(and(field("genre").equal("Science Fiction"), field("published").greaterThan(1950))));
 *
 * // Example 3: Calculate the average rating of books published after 1980
 * const results3 = await execute(db.pipeline()
 *     .collection("books")
 *     .where(field("published").greaterThan(1980))
 *     .aggregate(average(field("rating")).as("averageRating")));
 * ```
 */
let Pipeline$1 = class Pipeline {
    /**
     * @internal
     * @private
     * @param _db
     * @param userDataReader
     * @param _userDataWriter
     * @param stages
     */
    constructor(
    /**
     * @internal
     * @private
     */
    _db, 
    /**
     * @internal
     * @private
     */
    userDataReader, 
    /**
     * @internal
     * @private
     */
    _userDataWriter, 
    /**
     * @internal
     * @private
     */
    stages) {
        this._db = _db;
        this.userDataReader = userDataReader;
        this._userDataWriter = _userDataWriter;
        this.stages = stages;
    }
    _readUserData(context) {
        this.stages.forEach(stage => {
            const subContext = context.contextWith({
                methodName: stage._name
            });
            stage._readUserData(subContext);
        });
    }
    addFields(fieldOrOptions, ...additionalFields) {
        // Process argument union(s) from method overloads
        let fields;
        let options;
        if (commonB9spVcbo_node.isSelectable(fieldOrOptions)) {
            fields = [fieldOrOptions, ...additionalFields];
            options = {};
        }
        else {
            ({ fields, ...options } = fieldOrOptions);
        }
        // Convert user land convenience types to internal types
        const normalizedFields = selectablesToMap(fields);
        // Create stage object
        const stage = new commonB9spVcbo_node.AddFields(normalizedFields, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    removeFields(fieldValueOrOptions, ...additionalFields) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isField(fieldValueOrOptions) || commonB9spVcbo_node.isString$1(fieldValueOrOptions)
            ? {}
            : fieldValueOrOptions;
        const fields = commonB9spVcbo_node.isField(fieldValueOrOptions) || commonB9spVcbo_node.isString$1(fieldValueOrOptions)
            ? [fieldValueOrOptions, ...additionalFields]
            : fieldValueOrOptions.fields;
        // Convert user land convenience types to internal types
        const convertedFields = fields.map(f => commonB9spVcbo_node.isString$1(f) ? commonB9spVcbo_node.field(f) : f);
        // Create stage object
        const stage = new commonB9spVcbo_node.RemoveFields(convertedFields, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    define(aliasedExpressionOrOptions, ...additionalExpressions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isAliasedExpr(aliasedExpressionOrOptions)
            ? {}
            : aliasedExpressionOrOptions;
        const aliasedExpressions = commonB9spVcbo_node.isAliasedExpr(aliasedExpressionOrOptions)
            ? [aliasedExpressionOrOptions, ...additionalExpressions]
            : aliasedExpressionOrOptions.variables;
        const convertedExpressions = selectablesToMap(aliasedExpressions);
        // Create stage object
        const stage = new commonB9spVcbo_node.Define(convertedExpressions, options);
        return this._addStage(stage);
    }
    /**
     * Converts this Pipeline into an expression that evaluates to an array of results.
     *
     * <p>Result Unwrapping:</p>
     * <ul>
     *  <li>If the items have a single field, their values are unwrapped and returned directly in the array.</li>
     *  <li>If the items have multiple fields, they are returned as objects in the array</li>
     * </ul>
     *
     * @example
     * ```typescript
     * // Get a list of reviewers for each book
     * db.pipeline().collection("books")
     *     .define(field("id").as("book_id"))
     *     .addFields(
     *         db.pipeline().collection("reviews")
     *             .where(field("book_id").equal(variable("book_id")))
     *             .select(field("reviewer"))
     *             .toArrayExpression()
     *             .as("reviewers")
     *     )
     * ```
     *
     * Output:
     * ```json
     * [
     *   {
     *     "id": "1",
     *     "title": "1984",
     *     "reviewers": ["Alice", "Bob"]
     *   }
     * ]
     * ```
     *
     * Multiple Fields:
     * ```typescript
     * // Get a list of reviews (reviewer and rating) for each book
     * db.pipeline().collection("books")
     *     .define(field("id").as("book_id"))
     *     .addFields(
     *         db.pipeline().collection("reviews")
     *             .where(field("book_id").equal(variable("book_id")))
     *             .select(field("reviewer"), field("rating"))
     *             .toArrayExpression()
     *             .as("reviews"))
     * ```
     *
     * Output:
     * ```json
     * [
     *   {
     *     "id": "1",
     *     "title": "1984",
     *     "reviews": [
     *       { "reviewer": "Alice", "rating": 5 },
     *       { "reviewer": "Bob", "rating": 4 }
     *     ]
     *   }
     * ]
     * ```
     *
     * @returns An `Expression` representing the execution of this pipeline.
     */
    toArrayExpression() {
        return new commonB9spVcbo_node.FunctionExpression('array', [fieldOrExpression(this)]);
    }
    /**
     * Converts this Pipeline into an expression that evaluates to a single scalar result.
     *
     * <p><b>Runtime Validation:</b> The runtime validates that the result set contains zero or one item. If
     * zero items, it evaluates to `null`.</p>
     *
     * <p>Result Unwrapping:</p>
     * <ul>
     *  <li>If the item has a single field, its value is unwrapped and returned directly.</li>
     *  <li>If the item has multiple fields, they are returned as an object.</li>
     * </ul>
     *
     * @example
     * ```typescript
     * // Calculate average rating for a restaurant
     * db.pipeline().collection("restaurants").addFields(
     *   db.pipeline().collection("reviews")
     *     .where(field("restaurant_id").equal(variable("rid")))
     *     .aggregate(average("rating").as("avg"))
     *     // Unwraps the single "avg" field to a scalar double
     *     .toScalarExpression().as("average_rating")
     * )
     * ```
     *
     * Output:
     * ```json
     * {
     *   "name": "The Burger Joint",
     *   "average_rating": 4.5
     * }
     * ```
     *
     * Multiple Fields:
     * ```typescript
     * // Calculate average rating AND count for a restaurant
     * db.pipeline().collection("restaurants").addFields(
     *   db.pipeline().collection("reviews")
     *     .where(field("restaurant_id").equal(variable("rid")))
     *     .aggregate(
     *       average("rating").as("avg"),
     *       count().as("count")
     *     )
     *     // Returns an object with "avg" and "count" fields
     *     .toScalarExpression().as("stats")
     * )
     * ```
     *
     * Output:
     * ```json
     * {
     *   "name": "The Burger Joint",
     *   "stats": {
     *     "avg": 4.5,
     *     "count": 100
     *   }
     * }
     * ```
     *
     * @returns An `Expression` representing the execution of this pipeline.
     */
    toScalarExpression() {
        return new commonB9spVcbo_node.FunctionExpression('scalar', [fieldOrExpression(this)]);
    }
    select(selectionOrOptions, ...additionalSelections) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isSelectable(selectionOrOptions) || commonB9spVcbo_node.isString$1(selectionOrOptions)
            ? {}
            : selectionOrOptions;
        const selections = commonB9spVcbo_node.isSelectable(selectionOrOptions) || commonB9spVcbo_node.isString$1(selectionOrOptions)
            ? [selectionOrOptions, ...additionalSelections]
            : selectionOrOptions.selections;
        // Convert user land convenience types to internal types
        const normalizedSelections = selectablesToMap(selections);
        // Create stage object
        const stage = new commonB9spVcbo_node.Select(normalizedSelections, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    where(conditionOrOptions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isBooleanExpr(conditionOrOptions) ? {} : conditionOrOptions;
        const condition = commonB9spVcbo_node.isBooleanExpr(conditionOrOptions)
            ? conditionOrOptions
            : conditionOrOptions.condition;
        // Create stage object
        const stage = new commonB9spVcbo_node.Where(condition, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    offset(offsetOrOptions) {
        // Process argument union(s) from method overloads
        let options;
        let offset;
        if (commonB9spVcbo_node.isNumber$1(offsetOrOptions)) {
            options = {};
            offset = offsetOrOptions;
        }
        else {
            options = offsetOrOptions;
            offset = offsetOrOptions.offset;
        }
        // Create stage object
        const stage = new commonB9spVcbo_node.Offset(offset, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    limit(limitOrOptions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isNumber$1(limitOrOptions) ? {} : limitOrOptions;
        const limit = commonB9spVcbo_node.isNumber$1(limitOrOptions)
            ? limitOrOptions
            : limitOrOptions.limit;
        // Create stage object
        const stage = new commonB9spVcbo_node.Limit(limit, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    distinct(groupOrOptions, ...additionalGroups) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isString$1(groupOrOptions) || commonB9spVcbo_node.isSelectable(groupOrOptions)
            ? {}
            : groupOrOptions;
        const groups = commonB9spVcbo_node.isString$1(groupOrOptions) || commonB9spVcbo_node.isSelectable(groupOrOptions)
            ? [groupOrOptions, ...additionalGroups]
            : groupOrOptions.groups;
        // Convert user land convenience types to internal types
        const convertedGroups = selectablesToMap(groups);
        // Create stage object
        const stage = new commonB9spVcbo_node.Distinct(convertedGroups, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    aggregate(targetOrOptions, ...rest) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isAliasedAggregate(targetOrOptions) ? {} : targetOrOptions;
        const accumulators = commonB9spVcbo_node.isAliasedAggregate(targetOrOptions)
            ? [targetOrOptions, ...rest]
            : targetOrOptions.accumulators;
        const groups = commonB9spVcbo_node.isAliasedAggregate(targetOrOptions)
            ? []
            : (targetOrOptions.groups ?? []);
        // Convert user land convenience types to internal types
        const convertedAccumulators = aliasedAggregateToMap(accumulators);
        const convertedGroups = selectablesToMap(groups);
        // Create stage object
        const stage = new commonB9spVcbo_node.Aggregate(convertedGroups, convertedAccumulators, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    /**
     * Performs a vector proximity search on the documents from the previous stage, returning the
     * K-nearest documents based on the specified query `vectorValue` and `distanceMeasure`. The
     * returned documents will be sorted in order from nearest to furthest from the query `vectorValue`.
     *
     * @example
     * ```typescript
     * // Find the 10 most similar books based on the book description.
     * const bookDescription = "Lorem ipsum...";
     * const queryVector: number[] = ...; // compute embedding of `bookDescription`
     *
     * firestore.pipeline().collection("books")
     *     .findNearest({
     *       field: 'embedding',
     *       vectorValue: queryVector,
     *       distanceMeasure: 'euclidean',
     *       limit: 10,                        // optional
     *       distanceField: 'computedDistance' // optional
     *     });
     * ```
     *
     * @param options - An object that specifies required and optional parameters for the stage.
     * @returns A new {@link @firebase/firestore/pipelines#Pipeline} object with this stage appended to the stage list.
     */
    findNearest(options) {
        // Convert user land convenience types to internal types
        const field = commonB9spVcbo_node.toField(options.field);
        const vectorValue = vectorToExpr(options.vectorValue);
        const distanceField = options.distanceField
            ? commonB9spVcbo_node.toField(options.distanceField)
            : undefined;
        const internalOptions = {
            distanceField,
            limit: options.limit,
            rawOptions: options.rawOptions
        };
        // Create stage object
        const stage = new commonB9spVcbo_node.FindNearest(vectorValue, field, options.distanceMeasure, internalOptions);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    // TODO(search) link to external documentation citing list of supported
    // expressions, when that documentation is created. List is not maintained
    // in the SDK because the list will change as the backend enables support.
    /**
     * Add a search stage to the Pipeline. The search stage supports
     * full-text search and geo search expressions.
     *
     * @remarks
     * This must be the first stage of the pipeline. A limited set of expressions are supported in the search stage.
     *
     * @example
     * ```typescript
     * // Full-text search example
     * firestore.pipeline().collection("restaurants")
     * .search({
     *   query: documentMatches("waffles OR pancakes"),
     *   sort: [
     *     score().descending(),
     *   ],
     *   addFields: [
     *     score().as("searchScore"),
     *   ]
     * })
     * ```
     *
     * @example
     * ```typescript
     * // Geo distance search example
     * const queryLocation = new GeoPoint(0, 0);
     * db.pipeline().collection('restaurants').search({
     *   query: field('location').geoDistance(queryLocation).lessThanOrEqual(1000),
     *   sort: [
     *     score().descending(),
     *   ],
     * })
     * ```
     *
     * @param options - An object that specifies parameters for the stage.
     * @return A new `Pipeline` object with this stage appended to the stage list.
     * @beta
     */
    search(options) {
        // Convert user land convenience types to internal types
        const addFields = options.addFields
            ? selectablesToObject(options.addFields)
            : undefined;
        const query = commonB9spVcbo_node.isExpr(options.query)
            ? options.query
            : commonB9spVcbo_node.documentMatches(options.query);
        const sort = commonB9spVcbo_node.isOrdering(options.sort)
            ? [options.sort]
            : options.sort;
        const select = undefined;
        // TODO(search) enable with backend support
        // select = options.select
        //   ? selectablesToObject(options.select)
        //   : undefined;
        const internalOptions = {
            ...options,
            addFields,
            select,
            query,
            sort
        };
        // Create stage object
        const stage = new commonB9spVcbo_node.Search(internalOptions);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    sort(orderingOrOptions, ...additionalOrderings) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isOrdering(orderingOrOptions) ? {} : orderingOrOptions;
        const orderings = commonB9spVcbo_node.isOrdering(orderingOrOptions)
            ? [orderingOrOptions, ...additionalOrderings]
            : orderingOrOptions.orderings;
        // Create stage object
        const stage = new commonB9spVcbo_node.Sort(orderings, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    replaceWith(valueOrOptions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isString$1(valueOrOptions) || commonB9spVcbo_node.isExpr(valueOrOptions) ? {} : valueOrOptions;
        const fieldNameOrExpr = commonB9spVcbo_node.isString$1(valueOrOptions) || commonB9spVcbo_node.isExpr(valueOrOptions)
            ? valueOrOptions
            : valueOrOptions.map;
        // Convert user land convenience types to internal types
        const mapExpr = fieldOrExpression(fieldNameOrExpr);
        // Create stage object
        const stage = new commonB9spVcbo_node.Replace(mapExpr, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    sample(documentsOrOptions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isNumber$1(documentsOrOptions) ? {} : documentsOrOptions;
        let rate;
        let mode;
        if (commonB9spVcbo_node.isNumber$1(documentsOrOptions)) {
            rate = documentsOrOptions;
            mode = 'documents';
        }
        else if (commonB9spVcbo_node.isNumber$1(documentsOrOptions.documents)) {
            rate = documentsOrOptions.documents;
            mode = 'documents';
        }
        else {
            rate = documentsOrOptions.percentage;
            mode = 'percent';
        }
        // Create stage object
        const stage = new commonB9spVcbo_node.Sample(rate, mode, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    union(otherOrOptions) {
        // Process argument union(s) from method overloads
        let options;
        let otherPipeline;
        if (isPipeline(otherOrOptions)) {
            options = {};
            otherPipeline = otherOrOptions;
        }
        else {
            ({ other: otherPipeline, ...options } = otherOrOptions);
        }
        // Create stage object
        const stage = new commonB9spVcbo_node.Union(otherPipeline, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    unnest(selectableOrOptions, indexField) {
        // Process argument union(s) from method overloads
        let options;
        let selectable;
        let indexFieldName;
        if (commonB9spVcbo_node.isSelectable(selectableOrOptions)) {
            options = {};
            selectable = selectableOrOptions;
            indexFieldName = indexField;
        }
        else {
            ({
                selectable,
                indexField: indexFieldName,
                ...options
            } = selectableOrOptions);
        }
        // Convert user land convenience types to internal types
        const alias = selectable.alias;
        const expr = selectable.expr;
        if (commonB9spVcbo_node.isString$1(indexFieldName)) {
            options.indexField = commonB9spVcbo_node._field(indexFieldName, 'unnest');
        }
        // Create stage object
        const stage = new commonB9spVcbo_node.Unnest(alias, expr, options);
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    /**
     * Adds a raw stage to the pipeline.
     *
     * <p>This method provides a flexible way to extend the pipeline's functionality by adding custom
     * stages. Each raw stage is defined by a unique `name` and a set of `params` that control its
     * behavior.
     *
     * <p>Example (Assuming there is no 'where' stage available in SDK):
     *
     * @example
     * ```typescript
     * // Assume we don't have a built-in 'where' stage
     * firestore.pipeline().collection('books')
     *     .rawStage('where', [field('published').lessThan(1900)]) // Custom 'where' stage
     *     .select('title', 'author');
     * ```
     *
     * @param name - The unique name of the raw stage to add.
     * @param params - A list of parameters to configure the raw stage's behavior.
     * @param options - An object of key value pairs that specifies optional parameters for the stage.
     * @returns A new {@link @firebase/firestore/pipelines#Pipeline} object with this stage appended to the stage list.
     */
    rawStage(name, params, options) {
        // Convert user land convenience types to internal types
        const expressionParams = params.map((value) => {
            if (value instanceof commonB9spVcbo_node.Expression) {
                return value;
            }
            else if (value instanceof commonB9spVcbo_node.AggregateFunction) {
                return value;
            }
            else if (commonB9spVcbo_node.isPlainObject(value)) {
                return commonB9spVcbo_node._mapValue(value);
            }
            else {
                return commonB9spVcbo_node._constant(value, 'rawStage');
            }
        });
        // Create stage object
        const stage = new commonB9spVcbo_node.RawStage(name, expressionParams, options ?? {});
        // Add stage to the pipeline
        return this._addStage(stage);
    }
    /**
     * @internal
     * @private
     */
    _toProto(jsonProtoSerializer) {
        const stages = this.stages.map(stage => stage._toProto(jsonProtoSerializer));
        return { stages };
    }
    _addStage(stage) {
        const copy = this.stages.map(s => s);
        copy.push(stage);
        return this.newPipeline(this._db, copy);
    }
    /**
     * @internal
     * @private
     * @param db
     * @param userDataReader
     * @param userDataWriter
     * @param stages
     * @protected
     */
    newPipeline(db, stages) {
        return new Pipeline(db, this.userDataReader, this._userDataWriter, stages);
    }
};
function isPipeline(val) {
    return val instanceof Pipeline$1;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides the entry point for defining the data source of a Firestore {@link @firebase/firestore/pipelines#Pipeline}.
 *
 * Use the methods of this class (e.g., {@link @firebase/firestore/pipelines#PipelineSource.(collection:1)}, {@link @firebase/firestore/pipelines#PipelineSource.(collectionGroup:1)},
 * {@link @firebase/firestore/pipelines#PipelineSource.(database:1)}, or {@link @firebase/firestore/pipelines#PipelineSource.(documents:1)}) to specify the initial data
 * for your pipeline, such as a collection, a collection group, the entire database, or a set of specific documents.
 */
class PipelineSource {
    /**
     * @internal
     * @private
     * @param databaseId
     * @param userDataReader
     * @param _createPipeline
     */
    constructor(databaseId, userDataReader, 
    /**
     * @internal
     * @private
     */
    _createPipeline) {
        this.databaseId = databaseId;
        this.userDataReader = userDataReader;
        this._createPipeline = _createPipeline;
    }
    collection(collectionOrOptions) {
        // Process argument union(s) from method overloads
        const options = commonB9spVcbo_node.isString$1(collectionOrOptions) ||
            commonB9spVcbo_node.isCollectionReference(collectionOrOptions)
            ? {}
            : collectionOrOptions;
        const collectionRefOrString = commonB9spVcbo_node.isString$1(collectionOrOptions) ||
            commonB9spVcbo_node.isCollectionReference(collectionOrOptions)
            ? collectionOrOptions
            : collectionOrOptions.collection;
        // Validate that a user provided reference is for the same Firestore DB
        if (commonB9spVcbo_node.isCollectionReference(collectionRefOrString)) {
            this._validateReference(collectionRefOrString);
        }
        // Convert user land convenience types to internal types
        const normalizedCollection = commonB9spVcbo_node.isString$1(collectionRefOrString)
            ? collectionRefOrString
            : collectionRefOrString.path;
        // Create stage object
        const stage = new commonB9spVcbo_node.CollectionSource(normalizedCollection, options);
        // User data must be read in the context of the API method to
        // provide contextual errors
        const parseContext = this.userDataReader.createContext(3 /* UserDataSource.Argument */, 'collection');
        stage._readUserData(parseContext);
        // Add stage to the pipeline
        return this._createPipeline([stage]);
    }
    collectionGroup(collectionIdOrOptions) {
        // Process argument union(s) from method overloads
        let collectionId;
        let options;
        if (commonB9spVcbo_node.isString$1(collectionIdOrOptions)) {
            collectionId = collectionIdOrOptions;
            options = {};
        }
        else {
            ({ collectionId, ...options } = collectionIdOrOptions);
        }
        // Create stage object
        const stage = new commonB9spVcbo_node.CollectionGroupSource(collectionId, options);
        // User data must be read in the context of the API method to
        // provide contextual errors
        const parseContext = this.userDataReader.createContext(3 /* UserDataSource.Argument */, 'collectionGroup');
        stage._readUserData(parseContext);
        // Add stage to the pipeline
        return this._createPipeline([stage]);
    }
    database(options) {
        // Process argument union(s) from method overloads
        options = options ?? {};
        // Create stage object
        const stage = new commonB9spVcbo_node.DatabaseSource(options);
        // User data must be read in the context of the API method to
        // provide contextual errors
        const parseContext = this.userDataReader.createContext(3 /* UserDataSource.Argument */, 'database');
        stage._readUserData(parseContext);
        // Add stage to the pipeline
        return this._createPipeline([stage]);
    }
    documents(docsOrOptions) {
        // Process argument union(s) from method overloads
        let options;
        let docs;
        if (Array.isArray(docsOrOptions)) {
            docs = docsOrOptions;
            options = {};
        }
        else {
            ({ docs, ...options } = docsOrOptions);
        }
        // Validate that all user provided references are for the same Firestore DB
        docs
            .filter(v => v instanceof commonB9spVcbo_node.DocumentReference)
            .forEach(dr => this._validateReference(dr));
        // Convert user land convenience types to internal types
        const normalizedDocs = docs.map(doc => commonB9spVcbo_node.isString$1(doc) ? doc : doc.path);
        // Create stage object
        const stage = new commonB9spVcbo_node.DocumentsSource(normalizedDocs, options);
        // User data must be read in the context of the API method to
        // provide contextual errors
        const parseContext = this.userDataReader.createContext(3 /* UserDataSource.Argument */, 'documents');
        stage._readUserData(parseContext);
        // Add stage to the pipeline
        return this._createPipeline([stage]);
    }
    /**
     * Convert the given Query into an equivalent Pipeline.
     *
     * @param query - A Query to be converted into a Pipeline.
     *
     * @throws `FirestoreError` Thrown if any of the provided DocumentReferences target a different project or database than the pipeline.
     */
    createFrom(query) {
        return this._createPipeline(commonB9spVcbo_node.toPipelineStages(query._query, query.firestore));
    }
    _validateReference(reference) {
        const refDbId = reference.firestore._databaseId;
        if (!refDbId.isEqual(this.databaseId)) {
            throw new commonB9spVcbo_node.FirestoreError(commonB9spVcbo_node.Code.INVALID_ARGUMENT, `Invalid ${reference instanceof commonB9spVcbo_node.CollectionReference
                ? 'CollectionReference'
                : 'DocumentReference'}. ` +
                `The project ID ("${refDbId.projectId}") or the database ("${refDbId.database}") does not match ` +
                `the project ID ("${this.databaseId.projectId}") and database ("${this.databaseId.database}") of the target database of this Pipeline.`);
        }
    }
}
function subcollection(pathOrOptions) {
    // Process argument union(s) from method overloads
    let path;
    let options;
    if (commonB9spVcbo_node.isString$1(pathOrOptions)) {
        path = pathOrOptions;
        options = {};
    }
    else {
        ({ path, ...options } = pathOrOptions);
    }
    // Create stage object
    const stage = new commonB9spVcbo_node.SubcollectionSource(path, options);
    return new Pipeline$1(undefined, undefined, undefined, [stage]);
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents the results of a Firestore pipeline execution.
 *
 * A `PipelineSnapshot` contains zero or more {@link @firebase/firestore/pipelines#PipelineResult} objects
 * representing the documents returned by a pipeline query. It provides methods
 * to iterate over the documents and access metadata about the query results.
 *
 * @example
 * ```typescript
 * const snapshot: PipelineSnapshot = await firestore
 *   .pipeline()
 *   .collection('myCollection')
 *   .where(field('value').greaterThan(10))
 *   .execute();
 *
 * snapshot.results.forEach(doc => {
 *   console.log(doc.id, '=>', doc.data());
 * });
 * ```
 */
class PipelineSnapshot {
    constructor(pipeline, results, executionTime) {
        this._pipeline = pipeline;
        this._executionTime = executionTime;
        this._results = results;
    }
    /**
     * An array of all the results in the `PipelineSnapshot`.
     */
    get results() {
        return this._results;
    }
    /**
     * The time at which the pipeline producing this result is executed.
     *
     * @readonly
     *
     */
    get executionTime() {
        if (this._executionTime === undefined) {
            throw new Error("'executionTime' is expected to exist, but it is undefined");
        }
        return this._executionTime;
    }
}
/**
 *
 * A PipelineResult contains data read from a Firestore Pipeline. The data can be extracted with the
 * {@link @firebase/firestore/pipelines#PipelineResult.data} or {@link @firebase/firestore/pipelines#PipelineResult.(get:1)} methods.
 *
 * <p>If the PipelineResult represents a non-document result, `ref` will return a undefined
 * value.
 */
class PipelineResult {
    /**
     * @private
     * @internal
     *
     * @param userDataWriter - The serializer used to encode/decode protobuf.
     * @param fields - The fields of the Firestore `Document` Protobuf backing
     * this document.
     * @param ref - The reference to the document.
     * @param createTime - The time when the document was created if the result is a document, undefined otherwise.
     * @param updateTime - The time when the document was last updated if the result is a document, undefined otherwise.
     * @param metadata
     * @param listenOptions
     */
    constructor(userDataWriter, fields, ref, createTime, updateTime, metadata, listenOptions) {
        this._ref = ref;
        this._userDataWriter = userDataWriter;
        this._createTime = createTime;
        this._updateTime = updateTime;
        this._fields = fields;
        this._metadata = metadata;
        this._listenOptions = listenOptions;
    }
    /**
     * @private
     * @internal
     * @param userDataWriter
     * @param doc
     * @param ref
     * @param metadata
     * @param listenOptions
     */
    static fromDocument(userDataWriter, doc, ref, metadata, listenOptions) {
        return new PipelineResult(userDataWriter, doc.data, ref, doc.createTime.toTimestamp(), doc.version.toTimestamp(), metadata, listenOptions);
    }
    /**
     * The reference of the document, if it is a document; otherwise `undefined`.
     */
    get ref() {
        return this._ref;
    }
    /**
     * The ID of the document for which this PipelineResult contains data, if it is a document; otherwise `undefined`.
     *
     * @readonly
     *
     */
    get id() {
        return this._ref?.id;
    }
    /**
     * The time the document was created. Undefined if this result is not a document.
     *
     * @readonly
     */
    get createTime() {
        return this._createTime;
    }
    /**
     * The time the document was last updated (at the time the snapshot was
     * generated). Undefined if this result is not a document.
     *
     * @readonly
     */
    get updateTime() {
        return this._updateTime;
    }
    /**
     * Retrieves all fields in the result as an object.
     *
     * @returns An object containing all fields in the document or
     * 'undefined' if the document doesn't exist.
     *
     * @example
     * ```
     * let p = firestore.pipeline().collection('col');
     *
     * p.execute().then(results => {
     *   let data = results[0].data();
     *   console.log(`Retrieved data: ${JSON.stringify(data)}`);
     * });
     * ```
     */
    data() {
        return this._userDataWriter.convertValue(this._fields.value, this._listenOptions?.serverTimestampBehavior);
    }
    /**
     * @internal
     * @private
     *
     * Retrieves all fields in the result as a proto value.
     *
     * @returns An `Object` containing all fields in the result.
     */
    _fieldsProto() {
        // Return a cloned value to prevent manipulation of the Snapshot's data
        return this._fields.clone().value.mapValue.fields;
    }
    /**
     * Retrieves the field specified by `field`.
     *
     * @param field - The field path
     * (e.g. 'foo' or 'foo.bar') to a specific field.
     * @returns The data at the specified field location or `undefined` if no
     * such field exists.
     *
     * @example
     * ```
     * let p = firestore.pipeline().collection('col');
     *
     * p.execute().then(results => {
     *   let field = results[0].get('a.b');
     *   console.log(`Retrieved field value: ${field}`);
     * });
     * ```
     */
    // We deliberately use `any` in the external API to not impose type-checking
    // on end users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(fieldPath) {
        if (this._fields === undefined) {
            return undefined;
        }
        if (commonB9spVcbo_node.isField(fieldPath)) {
            fieldPath = fieldPath.fieldName;
        }
        const value = this._fields.field(commonB9spVcbo_node.fieldPathFromArgument('DocumentSnapshot.get', fieldPath));
        if (value !== null) {
            return this._userDataWriter.convertValue(value, this._listenOptions?.serverTimestampBehavior);
        }
    }
}
/**
 * Test equality of two PipelineResults.
 * @param left - First PipelineResult to compare.
 * @param right - Second PipelineResult to compare.
 */
function pipelineResultEqual(left, right) {
    if (left === right) {
        return true;
    }
    return (commonB9spVcbo_node.isOptionalEqual(left._ref, right._ref, commonB9spVcbo_node.refEqual) &&
        commonB9spVcbo_node.isOptionalEqual(left._fields, right._fields, (l, r) => l.isEqual(r)));
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pipeline extends Pipeline$1 {
    /**
     * @internal
     * @private
     * @param db
     * @param userDataReader
     * @param userDataWriter
     * @param stages
     * @param converter
     * @protected
     */
    newPipeline(db, stages) {
        return new Pipeline(db, this.userDataReader, this._userDataWriter, stages);
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function execute(pipelineOrOptions) {
    const options = !(pipelineOrOptions instanceof Pipeline$1)
        ? pipelineOrOptions
        : {
            pipeline: pipelineOrOptions
        };
    const { pipeline, rawOptions, ...rest } = options;
    if (!pipeline._db) {
        return Promise.reject(new commonB9spVcbo_node.FirestoreError(commonB9spVcbo_node.Code.FAILED_PRECONDITION, 'This pipeline was created without a database (e.g., as a subcollection pipeline) and cannot be executed directly. It can only be used as part of another pipeline.'));
    }
    const firestore = commonB9spVcbo_node.cast(pipeline._db, commonB9spVcbo_node.Firestore);
    const client = commonB9spVcbo_node.ensureFirestoreConfigured(firestore);
    const userDataReader = commonB9spVcbo_node.newUserDataReader(firestore);
    const context = userDataReader.createContext(3 /* UserDataSource.Argument */, 'execute');
    pipeline._readUserData(context);
    const userDataWriter = new commonB9spVcbo_node.ExpUserDataWriter(firestore);
    const structuredPipelineOptions = new commonB9spVcbo_node.StructuredPipelineOptions(rest, rawOptions);
    structuredPipelineOptions._readUserData(context);
    const structuredPipeline = new commonB9spVcbo_node.StructuredPipeline(pipeline, structuredPipelineOptions);
    return commonB9spVcbo_node.firestoreClientExecutePipeline(client, structuredPipeline).then(result => {
        // Get the execution time from the first result.
        // firestoreClientExecutePipeline returns at least one PipelineStreamElement
        // even if the returned document set is empty.
        const executionTime = result.length > 0 ? result[0].executionTime?.toTimestamp() : undefined;
        const docs = result
            // Currently ignore any response from ExecutePipeline that does
            // not contain any document data in the `fields` property.
            .filter(element => !!element.fields)
            .map(element => new PipelineResult(userDataWriter, element.fields, element.key?.path
            ? new commonB9spVcbo_node.DocumentReference(firestore, null, element.key)
            : undefined, element.createTime?.toTimestamp(), element.updateTime?.toTimestamp()));
        return new PipelineSnapshot(pipeline, docs, executionTime);
    });
}
/**
 * @beta
 * Creates and returns a new PipelineSource, which allows specifying the source stage of a {@link @firebase/firestore/pipelines#Pipeline}.
 *
 * @example
 * ```typescript
 * let myPipeline: Pipeline = firestore.pipeline().collection('books');
 * ```
 */
// Augment the Firestore class with the pipeline() factory method
commonB9spVcbo_node.Firestore.prototype.pipeline = function () {
    const userDataReader = commonB9spVcbo_node.newUserDataReader(this);
    return new PipelineSource(this._databaseId, userDataReader, (stages) => {
        return new Pipeline(this, userDataReader, new commonB9spVcbo_node.ExpUserDataWriter(this), stages);
    });
};

exports.AggregateFunction = commonB9spVcbo_node.AggregateFunction;
exports.AliasedAggregate = commonB9spVcbo_node.AliasedAggregate;
exports.AliasedExpression = commonB9spVcbo_node.AliasedExpression;
exports.BooleanExpression = commonB9spVcbo_node.BooleanExpression;
exports.Expression = commonB9spVcbo_node.Expression;
exports.Field = commonB9spVcbo_node.Field;
exports.FunctionExpression = commonB9spVcbo_node.FunctionExpression;
exports.Ordering = commonB9spVcbo_node.Ordering;
exports._internalPipelineToExecutePipelineRequestProto = commonB9spVcbo_node._internalPipelineToExecutePipelineRequestProto;
exports.abs = commonB9spVcbo_node.abs;
exports.add = commonB9spVcbo_node.add;
exports.and = commonB9spVcbo_node.and;
exports.array = commonB9spVcbo_node.array;
exports.arrayAgg = commonB9spVcbo_node.arrayAgg;
exports.arrayAggDistinct = commonB9spVcbo_node.arrayAggDistinct;
exports.arrayConcat = commonB9spVcbo_node.arrayConcat;
exports.arrayContains = commonB9spVcbo_node.arrayContains;
exports.arrayContainsAll = commonB9spVcbo_node.arrayContainsAll;
exports.arrayContainsAny = commonB9spVcbo_node.arrayContainsAny;
exports.arrayFilter = commonB9spVcbo_node.arrayFilter;
exports.arrayFirst = commonB9spVcbo_node.arrayFirst;
exports.arrayFirstN = commonB9spVcbo_node.arrayFirstN;
exports.arrayGet = commonB9spVcbo_node.arrayGet;
exports.arrayIndexOf = commonB9spVcbo_node.arrayIndexOf;
exports.arrayIndexOfAll = commonB9spVcbo_node.arrayIndexOfAll;
exports.arrayLast = commonB9spVcbo_node.arrayLast;
exports.arrayLastIndexOf = commonB9spVcbo_node.arrayLastIndexOf;
exports.arrayLastN = commonB9spVcbo_node.arrayLastN;
exports.arrayLength = commonB9spVcbo_node.arrayLength;
exports.arrayMaximum = commonB9spVcbo_node.arrayMaximum;
exports.arrayMaximumN = commonB9spVcbo_node.arrayMaximumN;
exports.arrayMinimum = commonB9spVcbo_node.arrayMinimum;
exports.arrayMinimumN = commonB9spVcbo_node.arrayMinimumN;
exports.arraySlice = commonB9spVcbo_node.arraySlice;
exports.arraySum = commonB9spVcbo_node.arraySum;
exports.arrayTransform = commonB9spVcbo_node.arrayTransform;
exports.arrayTransformWithIndex = commonB9spVcbo_node.arrayTransformWithIndex;
exports.ascending = commonB9spVcbo_node.ascending;
exports.average = commonB9spVcbo_node.average;
exports.byteLength = commonB9spVcbo_node.byteLength;
exports.ceil = commonB9spVcbo_node.ceil;
exports.charLength = commonB9spVcbo_node.charLength;
exports.coalesce = commonB9spVcbo_node.coalesce;
exports.collectionId = commonB9spVcbo_node.collectionId;
exports.concat = commonB9spVcbo_node.concat;
exports.conditional = commonB9spVcbo_node.conditional;
exports.constant = commonB9spVcbo_node.constant;
exports.cosineDistance = commonB9spVcbo_node.cosineDistance;
exports.count = commonB9spVcbo_node.count;
exports.countAll = commonB9spVcbo_node.countAll;
exports.countDistinct = commonB9spVcbo_node.countDistinct;
exports.countIf = commonB9spVcbo_node.countIf;
exports.currentDocument = commonB9spVcbo_node.currentDocument;
exports.currentTimestamp = commonB9spVcbo_node.currentTimestamp;
exports.descending = commonB9spVcbo_node.descending;
exports.divide = commonB9spVcbo_node.divide;
exports.documentId = commonB9spVcbo_node.documentId;
exports.documentMatches = commonB9spVcbo_node.documentMatches;
exports.dotProduct = commonB9spVcbo_node.dotProduct;
exports.endsWith = commonB9spVcbo_node.endsWith;
exports.equal = commonB9spVcbo_node.equal;
exports.equalAny = commonB9spVcbo_node.equalAny;
exports.euclideanDistance = commonB9spVcbo_node.euclideanDistance;
exports.exists = commonB9spVcbo_node.exists;
exports.exp = commonB9spVcbo_node.exp;
exports.field = commonB9spVcbo_node.field;
exports.first = commonB9spVcbo_node.first;
exports.floor = commonB9spVcbo_node.floor;
exports.geoDistance = commonB9spVcbo_node.geoDistance;
exports.greaterThan = commonB9spVcbo_node.greaterThan;
exports.greaterThanOrEqual = commonB9spVcbo_node.greaterThanOrEqual;
exports.ifAbsent = commonB9spVcbo_node.ifAbsent;
exports.ifError = commonB9spVcbo_node.ifError;
exports.ifNull = commonB9spVcbo_node.ifNull;
exports.isAbsent = commonB9spVcbo_node.isAbsent;
exports.isError = commonB9spVcbo_node.isError;
exports.isType = commonB9spVcbo_node.isType;
exports.join = commonB9spVcbo_node.join;
exports.last = commonB9spVcbo_node.last;
exports.length = commonB9spVcbo_node.length;
exports.lessThan = commonB9spVcbo_node.lessThan;
exports.lessThanOrEqual = commonB9spVcbo_node.lessThanOrEqual;
exports.like = commonB9spVcbo_node.like;
exports.ln = commonB9spVcbo_node.ln;
exports.log = commonB9spVcbo_node.log;
exports.log10 = commonB9spVcbo_node.log10;
exports.logicalMaximum = commonB9spVcbo_node.logicalMaximum;
exports.logicalMinimum = commonB9spVcbo_node.logicalMinimum;
exports.ltrim = commonB9spVcbo_node.ltrim;
exports.map = commonB9spVcbo_node.map;
exports.mapEntries = commonB9spVcbo_node.mapEntries;
exports.mapGet = commonB9spVcbo_node.mapGet;
exports.mapKeys = commonB9spVcbo_node.mapKeys;
exports.mapMerge = commonB9spVcbo_node.mapMerge;
exports.mapRemove = commonB9spVcbo_node.mapRemove;
exports.mapSet = commonB9spVcbo_node.mapSet;
exports.mapValues = commonB9spVcbo_node.mapValues;
exports.maximum = commonB9spVcbo_node.maximum;
exports.minimum = commonB9spVcbo_node.minimum;
exports.mod = commonB9spVcbo_node.mod;
exports.multiply = commonB9spVcbo_node.multiply;
exports.nor = commonB9spVcbo_node.nor;
exports.not = commonB9spVcbo_node.not;
exports.notEqual = commonB9spVcbo_node.notEqual;
exports.notEqualAny = commonB9spVcbo_node.notEqualAny;
exports.or = commonB9spVcbo_node.or;
exports.parent = commonB9spVcbo_node.parent;
exports.pow = commonB9spVcbo_node.pow;
exports.rand = commonB9spVcbo_node.rand;
exports.regexContains = commonB9spVcbo_node.regexContains;
exports.regexFind = commonB9spVcbo_node.regexFind;
exports.regexFindAll = commonB9spVcbo_node.regexFindAll;
exports.regexMatch = commonB9spVcbo_node.regexMatch;
exports.reverse = commonB9spVcbo_node.reverse;
exports.round = commonB9spVcbo_node.round;
exports.rtrim = commonB9spVcbo_node.rtrim;
exports.score = commonB9spVcbo_node.score;
exports.split = commonB9spVcbo_node.split;
exports.sqrt = commonB9spVcbo_node.sqrt;
exports.startsWith = commonB9spVcbo_node.startsWith;
exports.stringConcat = commonB9spVcbo_node.stringConcat;
exports.stringContains = commonB9spVcbo_node.stringContains;
exports.stringIndexOf = commonB9spVcbo_node.stringIndexOf;
exports.stringRepeat = commonB9spVcbo_node.stringRepeat;
exports.stringReplaceAll = commonB9spVcbo_node.stringReplaceAll;
exports.stringReplaceOne = commonB9spVcbo_node.stringReplaceOne;
exports.stringReverse = commonB9spVcbo_node.stringReverse;
exports.substring = commonB9spVcbo_node.substring;
exports.subtract = commonB9spVcbo_node.subtract;
exports.sum = commonB9spVcbo_node.sum;
exports.switchOn = commonB9spVcbo_node.switchOn;
exports.timestampAdd = commonB9spVcbo_node.timestampAdd;
exports.timestampDiff = commonB9spVcbo_node.timestampDiff;
exports.timestampExtract = commonB9spVcbo_node.timestampExtract;
exports.timestampSubtract = commonB9spVcbo_node.timestampSubtract;
exports.timestampToUnixMicros = commonB9spVcbo_node.timestampToUnixMicros;
exports.timestampToUnixMillis = commonB9spVcbo_node.timestampToUnixMillis;
exports.timestampToUnixSeconds = commonB9spVcbo_node.timestampToUnixSeconds;
exports.timestampTruncate = commonB9spVcbo_node.timestampTruncate;
exports.toLower = commonB9spVcbo_node.toLower;
exports.toUpper = commonB9spVcbo_node.toUpper;
exports.trim = commonB9spVcbo_node.trim;
exports.trunc = commonB9spVcbo_node.trunc;
exports.type = commonB9spVcbo_node.type;
exports.unixMicrosToTimestamp = commonB9spVcbo_node.unixMicrosToTimestamp;
exports.unixMillisToTimestamp = commonB9spVcbo_node.unixMillisToTimestamp;
exports.unixSecondsToTimestamp = commonB9spVcbo_node.unixSecondsToTimestamp;
exports.variable = commonB9spVcbo_node.variable;
exports.vectorLength = commonB9spVcbo_node.vectorLength;
exports.xor = commonB9spVcbo_node.xor;
exports.Pipeline = Pipeline;
exports.PipelineResult = PipelineResult;
exports.PipelineSnapshot = PipelineSnapshot;
exports.PipelineSource = PipelineSource;
exports.execute = execute;
exports.pipelineResultEqual = pipelineResultEqual;
exports.subcollection = subcollection;
//# sourceMappingURL=pipelines.node.cjs.js.map
