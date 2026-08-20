import { d as da, l as la, u as ua, b6 as __PRIVATE_isString$1, b7 as J, b8 as X, b9 as Y, ba as Z, I as aa, bb as sa, bc as ea, f as e, t as ta, aq as na, bd as f, be as w, bf as g, bg as s, bh as _, bi as T, bj as P, bk as y, bl as x, bm as E, bn as A, bo as __PRIVATE_isNumber$1, bp as I, bq as v, br as M, bs as V, bt as O, bu as S, bv as t, aw as n, bw as i, b4 as r, bx as D, by as F, bz as j, bA as q, bB as C, bC as L, bD as $, bE as N, bF as U, bG as G, bH as W, bI as k, bJ as p, bK as B, bL as m, bM as Q, bN as u, bO as h, bP as b, bQ as d, bR as o, bS as c, ae as l, K, s as ra, x as oa, bT as pa, bU as ha, bV as z, bW as ia, a$ as H, bX as ma } from './common-CE5hrKY-.esm.js';
export { bY as AliasedAggregate, bZ as BooleanExpression, ao as Bytes, o as FieldPath, ar as FieldValue, as as GeoPoint, b_ as Ordering, Q as Query, au as QueryDocumentSnapshot, S as SnapshotMetadata, av as Timestamp, b$ as _internalPipelineToExecutePipelineRequestProto, c0 as abs, c1 as add, c2 as and, c3 as arrayAgg, c4 as arrayAggDistinct, c5 as arrayConcat, c6 as arrayContains, c7 as arrayContainsAll, c8 as arrayContainsAny, c9 as arrayFilter, ca as arrayFirst, cb as arrayFirstN, cc as arrayGet, cd as arrayIndexOf, ce as arrayIndexOfAll, cf as arrayLast, cg as arrayLastIndexOf, ch as arrayLastN, ci as arrayLength, cj as arrayMaximum, ck as arrayMaximumN, cl as arrayMinimum, cm as arrayMinimumN, cn as arraySlice, co as arraySum, cp as arrayTransform, cq as arrayTransformWithIndex, cr as ascending, cs as average, ct as byteLength, cu as ceil, cv as charLength, cw as coalesce, cx as collectionId, cy as concat, cz as conditional, cA as cosineDistance, cB as count, cC as countAll, cD as countDistinct, cE as countIf, cF as currentDocument, cG as currentTimestamp, cH as descending, cI as divide, cJ as documentId, cK as dotProduct, cL as endsWith, cM as equal, cN as equalAny, cO as euclideanDistance, cP as exists, cQ as exp, cR as first, cS as floor, cT as geoDistance, cU as greaterThan, cV as greaterThanOrEqual, cW as ifAbsent, cX as ifError, cY as ifNull, cZ as isAbsent, c_ as isError, c$ as isType, d0 as join, d1 as last, d2 as length, d3 as lessThan, d4 as lessThanOrEqual, d5 as like, d6 as ln, d7 as log, d8 as log10, d9 as logicalMaximum, da as logicalMinimum, db as ltrim, dc as mapEntries, dd as mapGet, de as mapKeys, df as mapMerge, dg as mapRemove, dh as mapSet, di as mapValues, dj as maximum, dk as minimum, dl as mod, dm as multiply, dn as nor, dp as not, dq as notEqual, dr as notEqualAny, ds as or, dt as parent, du as pow, dv as rand, dw as regexContains, dx as regexFind, dy as regexFindAll, dz as regexMatch, dA as reverse, dB as round, dC as rtrim, dD as score, dE as split, dF as sqrt, dG as startsWith, dH as stringConcat, dI as stringContains, dJ as stringIndexOf, dK as stringRepeat, dL as stringReplaceAll, dM as stringReplaceOne, dN as stringReverse, dO as substring, dP as subtract, dQ as sum, dR as switchOn, dS as timestampAdd, dT as timestampDiff, dU as timestampExtract, dV as timestampSubtract, dW as timestampToUnixMicros, dX as timestampToUnixMillis, dY as timestampToUnixSeconds, dZ as timestampTruncate, d_ as toLower, d$ as toUpper, e0 as trim, e1 as trunc, e2 as type, e3 as unixMicrosToTimestamp, e4 as unixMillisToTimestamp, e5 as unixSecondsToTimestamp, e6 as variable, e7 as vectorLength, e8 as xor } from './common-CE5hrKY-.esm.js';
import '@firebase/app';
import '@firebase/util';
import '@firebase/webchannel-wrapper/bloom-blob';
import '@firebase/logger';
import '@firebase/webchannel-wrapper/webchannel-blob';
import 're2js';

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
 */ function __PRIVATE_selectablesToMap(a) {
    return new Map(Object.entries(__PRIVATE_selectablesToObject(a)));
}

function __PRIVATE_selectablesToObject(a) {
    const t = {};
    for (const n of a) {
        let a, i;
        if ("string" == typeof n ? (a = n, i = s(n)) : n instanceof o || n instanceof c ? (a = n.alias, 
        i = n.expr) : l(21273, {
            selectable: n
        }), void 0 !== t[a]) throw new e("invalid-argument", `Duplicate alias or field '${a}'`);
        t[a] = i;
    }
    return t;
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
function __PRIVATE_fieldOrExpression(e) {
    if (__PRIVATE_isString$1(e)) {
        return s(e);
    }
    /**
 * Converts a value to an Expression, Returning either a Constant, MapFunction,
 * ArrayFunction, or the input itself (if it's already an expression).
 *
 * @private
 * @internal
 * @param value
 */
    return function __PRIVATE_valueToDefaultExpr(a) {
        let s;
        if (u(a)) return i(a);
        if (a instanceof t) return a;
        s = p(a) ? h(a) : a instanceof Array ? b(a) : 
        /**
 * Checks if a value is a Pipeline object.
 *
 * We use duck typing here to avoid a circular dependency between pipeline.ts and pipeline_util.ts.
 */
        function __PRIVATE_isPipeline$1(a) {
            return "object" == typeof a && null !== a && "function" == typeof a.toArrayExpression;
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
 */ (a) ? d(a) : m(a, void 0);
        return s;
    }(e);
}

let fa = class Pipeline {
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
    a, 
    /**
     * @internal
     * @private
     */
    s, 
    /**
     * @internal
     * @private
     */
    e, 
    /**
     * @internal
     * @private
     */
    t) {
        this._db = a, this.userDataReader = s, this._userDataWriter = e, this.stages = t;
    }
    _readUserData(a) {
        this.stages.forEach((s => {
            const e = a.contextWith({
                methodName: s._name
            });
            s._readUserData(e);
        }));
    }
    addFields(a, ...s) {
        // Process argument union(s) from method overloads
        let e, t;
        f(a) ? (e = [ a, ...s ], t = {}) : ({fields: e, ...t} = a);
        // Convert user land convenience types to internal types
                const n = __PRIVATE_selectablesToMap(e), i = new w(n, t);
        // Create stage object
                // Add stage to the pipeline
        return this._addStage(i);
    }
    removeFields(e, ...t) {
        // Process argument union(s) from method overloads
        const n = g(e) || __PRIVATE_isString$1(e) ? {} : e, i = (g(e) || __PRIVATE_isString$1(e) ? [ e, ...t ] : e.fields).map((e => __PRIVATE_isString$1(e) ? s(e) : e)), r = new _(i, n);
        // Add stage to the pipeline
        return this._addStage(r);
    }
    define(a, ...s) {
        // Process argument union(s) from method overloads
        const e = T(a) ? {} : a, t = __PRIVATE_selectablesToMap(T(a) ? [ a, ...s ] : a.variables), n = new P(t, e);
        return this._addStage(n);
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
     */    toArrayExpression() {
        return new y("array", [ __PRIVATE_fieldOrExpression(this) ]);
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
     */    toScalarExpression() {
        return new y("scalar", [ __PRIVATE_fieldOrExpression(this) ]);
    }
    select(s, ...e) {
        // Process argument union(s) from method overloads
        const t = f(s) || __PRIVATE_isString$1(s) ? {} : s, n = __PRIVATE_selectablesToMap(f(s) || __PRIVATE_isString$1(s) ? [ s, ...e ] : s.selections), i = new x(n, t);
        // Add stage to the pipeline
        return this._addStage(i);
    }
    where(a) {
        // Process argument union(s) from method overloads
        const s = E(a) ? {} : a, e = E(a) ? a : a.condition, t = new A(e, s);
        // Add stage to the pipeline
        return this._addStage(t);
    }
    offset(a) {
        // Process argument union(s) from method overloads
        let s, e;
        __PRIVATE_isNumber$1(a) ? (s = {}, e = a) : (s = a, e = a.offset);
        // Create stage object
                const t = new I(e, s);
        // Add stage to the pipeline
                return this._addStage(t);
    }
    limit(a) {
        // Process argument union(s) from method overloads
        const s = __PRIVATE_isNumber$1(a) ? {} : a, e = __PRIVATE_isNumber$1(a) ? a : a.limit, t = new v(e, s);
        // Add stage to the pipeline
        return this._addStage(t);
    }
    distinct(s, ...e) {
        // Process argument union(s) from method overloads
        const t = __PRIVATE_isString$1(s) || f(s) ? {} : s, n = __PRIVATE_selectablesToMap(__PRIVATE_isString$1(s) || f(s) ? [ s, ...e ] : s.groups), i = new M(n, t);
        // Add stage to the pipeline
        return this._addStage(i);
    }
    aggregate(a, ...s) {
        // Process argument union(s) from method overloads
        const t = V(a) ? {} : a, n = V(a) ? [ a, ...s ] : a.accumulators, i = V(a) ? [] : a.groups ?? [], r = function __PRIVATE_aliasedAggregateToMap(a) {
            return a.reduce(((a, s) => {
                if (void 0 !== a.get(s.alias)) throw new e("invalid-argument", `Duplicate alias or field '${s.alias}'`);
                return a.set(s.alias, s.aggregate), a;
            }), new Map);
        }
        /**
 * Converts a value to an Expression, Returning either a Constant, MapFunction,
 * ArrayFunction, or the input itself (if it's already an expression).
 *
 * @private
 * @internal
 * @param value
 */ (n), o = __PRIVATE_selectablesToMap(i), c = new O(o, r, t);
        // Add stage to the pipeline
        return this._addStage(c);
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
     */    findNearest(a) {
        // Convert user land convenience types to internal types
        const s = S(a.field), e = function __PRIVATE_vectorToExpr(a) {
            if (a instanceof t) return a;
            if (a instanceof n) return i(a);
            if (Array.isArray(a)) return i(r(a));
            throw new Error("Unsupported value: " + typeof a);
        }(a.vectorValue), o = {
            distanceField: a.distanceField ? S(a.distanceField) : void 0,
            limit: a.limit,
            rawOptions: a.rawOptions
        }, c = new D(e, s, a.distanceMeasure, o);
        // Add stage to the pipeline
        return this._addStage(c);
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
    search(a) {
        // Convert user land convenience types to internal types
        const s = a.addFields ? __PRIVATE_selectablesToObject(a.addFields) : void 0, e = F(a.query) ? a.query : j(a.query), t = q(a.sort) ? [ a.sort ] : a.sort, n = {
            ...a,
            addFields: s,
            select: undefined,
            query: e,
            sort: t
        }, i = new C(n);
        // Add stage to the pipeline
        return this._addStage(i);
    }
    sort(a, ...s) {
        // Process argument union(s) from method overloads
        const e = q(a) ? {} : a, t = q(a) ? [ a, ...s ] : a.orderings, n = new L(t, e);
        // Add stage to the pipeline
        return this._addStage(n);
    }
    replaceWith(s) {
        // Process argument union(s) from method overloads
        const e = __PRIVATE_isString$1(s) || F(s) ? {} : s, t = __PRIVATE_fieldOrExpression(__PRIVATE_isString$1(s) || F(s) ? s : s.map), n = new $(t, e);
        // Add stage to the pipeline
        return this._addStage(n);
    }
    sample(a) {
        // Process argument union(s) from method overloads
        const s = __PRIVATE_isNumber$1(a) ? {} : a;
        let e, t;
        __PRIVATE_isNumber$1(a) ? (e = a, t = "documents") : __PRIVATE_isNumber$1(a.documents) ? (e = a.documents, t = "documents") : (e = a.percentage, 
        t = "percent");
        // Create stage object
                const n = new N(e, t, s);
        // Add stage to the pipeline
                return this._addStage(n);
    }
    union(a) {
        // Process argument union(s) from method overloads
        let s, e;
        !function __PRIVATE_isPipeline(a) {
            return a instanceof fa;
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
 */ (a) ? ({other: e, ...s} = a) : (s = {}, e = a);
        // Create stage object
                const t = new U(e, s);
        // Add stage to the pipeline
                return this._addStage(t);
    }
    unnest(s, e) {
        // Process argument union(s) from method overloads
        let t, n, i;
        f(s) ? (t = {}, n = s, i = e) : ({selectable: n, indexField: i, ...t} = s);
        // Convert user land convenience types to internal types
                const r = n.alias, o = n.expr;
        __PRIVATE_isString$1(i) && (t.indexField = G(i, "unnest"));
        // Create stage object
                const c = new W(r, o, t);
        // Add stage to the pipeline
                return this._addStage(c);
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
     */    rawStage(a, s, e) {
        // Convert user land convenience types to internal types
        const n = s.map((a => a instanceof t || a instanceof k ? a : p(a) ? B(a) : m(a, "rawStage"))), i = new Q(a, n, e ?? {});
        // Create stage object
                // Add stage to the pipeline
        return this._addStage(i);
    }
    /**
     * @internal
     * @private
     */    _toProto(a) {
        return {
            stages: this.stages.map((s => s._toProto(a)))
        };
    }
    _addStage(a) {
        const s = this.stages.map((a => a));
        return s.push(a), this.newPipeline(this._db, s);
    }
    /**
     * @internal
     * @private
     * @param db
     * @param userDataReader
     * @param userDataWriter
     * @param stages
     * @protected
     */    newPipeline(a, s) {
        return new Pipeline(a, this.userDataReader, this._userDataWriter, s);
    }
};

class PipelineSnapshot {
    constructor(a, s, e) {
        this._pipeline = a, this._executionTime = e, this._results = s;
    }
    /**
     * An array of all the results in the `PipelineSnapshot`.
     */    get results() {
        return this._results;
    }
    /**
     * The time at which the pipeline producing this result is executed.
     *
     * @readonly
     *
     */    get executionTime() {
        if (void 0 === this._executionTime) throw new Error("'executionTime' is expected to exist, but it is undefined");
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
 */ class PipelineResult {
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
    constructor(a, s, e, t, n, i, r) {
        this._ref = e, this._userDataWriter = a, this._createTime = t, this._updateTime = n, 
        this._fields = s, this._metadata = i, this._listenOptions = r;
    }
    /**
     * @private
     * @internal
     * @param userDataWriter
     * @param doc
     * @param ref
     * @param metadata
     * @param listenOptions
     */    static fromDocument(a, s, e, t, n) {
        return new PipelineResult(a, s.data, e, s.createTime.toTimestamp(), s.version.toTimestamp(), t, n);
    }
    /**
     * The reference of the document, if it is a document; otherwise `undefined`.
     */    get ref() {
        return this._ref;
    }
    /**
     * The ID of the document for which this PipelineResult contains data, if it is a document; otherwise `undefined`.
     *
     * @readonly
     *
     */    get id() {
        return this._ref?.id;
    }
    /**
     * The time the document was created. Undefined if this result is not a document.
     *
     * @readonly
     */    get createTime() {
        return this._createTime;
    }
    /**
     * The time the document was last updated (at the time the snapshot was
     * generated). Undefined if this result is not a document.
     *
     * @readonly
     */    get updateTime() {
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
     */    data() {
        return this._userDataWriter.convertValue(this._fields.value, this._listenOptions?.serverTimestampBehavior);
    }
    /**
     * @internal
     * @private
     *
     * Retrieves all fields in the result as a proto value.
     *
     * @returns An `Object` containing all fields in the result.
     */    _fieldsProto() {
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
    get(a) {
        if (void 0 === this._fields) return;
        g(a) && (a = a.fieldName);
        const s = this._fields.field(K("DocumentSnapshot.get", a));
        return null !== s ? this._userDataWriter.convertValue(s, this._listenOptions?.serverTimestampBehavior) : void 0;
    }
}

/**
 * Test equality of two PipelineResults.
 * @param left - First PipelineResult to compare.
 * @param right - Second PipelineResult to compare.
 */ function pipelineResultEqual(a, s) {
    return a === s || z(a._ref, s._ref, H) && z(a._fields, s._fields, ((a, s) => a.isEqual(s)));
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
 */ class PipelineSource {
    /**
     * @internal
     * @private
     * @param databaseId
     * @param userDataReader
     * @param _createPipeline
     */
    constructor(a, s, 
    /**
     * @internal
     * @private
     */
    e) {
        this.databaseId = a, this.userDataReader = s, this._createPipeline = e;
    }
    collection(s) {
        // Process argument union(s) from method overloads
        const e = __PRIVATE_isString$1(s) || J(s) ? {} : s, t = __PRIVATE_isString$1(s) || J(s) ? s : s.collection;
        // Validate that a user provided reference is for the same Firestore DB
        J(t) && this._validateReference(t);
        // Convert user land convenience types to internal types
                const n = __PRIVATE_isString$1(t) ? t : t.path, i = new X(n, e), r = this.userDataReader.createContext(3 /* UserDataSource.Argument */ , "collection");
        // Create stage object
                // Add stage to the pipeline
        return i._readUserData(r), this._createPipeline([ i ]);
    }
    collectionGroup(s) {
        // Process argument union(s) from method overloads
        let e, t;
        __PRIVATE_isString$1(s) ? (e = s, t = {}) : ({collectionId: e, ...t} = s);
        // Create stage object
                const n = new Y(e, t), i = this.userDataReader.createContext(3 /* UserDataSource.Argument */ , "collectionGroup");
        // User data must be read in the context of the API method to
        // provide contextual errors
                // Add stage to the pipeline
        return n._readUserData(i), this._createPipeline([ n ]);
    }
    database(a) {
        // Create stage object
        const s = new Z(
        // Process argument union(s) from method overloads
        a = a ?? {}), e = this.userDataReader.createContext(3 /* UserDataSource.Argument */ , "database");
        // User data must be read in the context of the API method to
        // provide contextual errors
                // Add stage to the pipeline
        return s._readUserData(e), this._createPipeline([ s ]);
    }
    documents(s) {
        // Process argument union(s) from method overloads
        let e, t;
        Array.isArray(s) ? (t = s, e = {}) : ({docs: t, ...e} = s), 
        // Validate that all user provided references are for the same Firestore DB
        t.filter((a => a instanceof aa)).forEach((a => this._validateReference(a)));
        // Convert user land convenience types to internal types
        const n = t.map((s => __PRIVATE_isString$1(s) ? s : s.path)), i = new sa(n, e), r = this.userDataReader.createContext(3 /* UserDataSource.Argument */ , "documents");
        // Create stage object
                // Add stage to the pipeline
        return i._readUserData(r), this._createPipeline([ i ]);
    }
    /**
     * Convert the given Query into an equivalent Pipeline.
     *
     * @param query - A Query to be converted into a Pipeline.
     *
     * @throws `FirestoreError` Thrown if any of the provided DocumentReferences target a different project or database than the pipeline.
     */    createFrom(a) {
        return this._createPipeline(ea(a._query, a.firestore));
    }
    _validateReference(a) {
        const s = a.firestore._databaseId;
        if (!s.isEqual(this.databaseId)) throw new e(ta.INVALID_ARGUMENT, `Invalid ${a instanceof na ? "CollectionReference" : "DocumentReference"}. The project ID ("${s.projectId}") or the database ("${s.database}") does not match the project ID ("${this.databaseId.projectId}") and database ("${this.databaseId.database}") of the target database of this Pipeline.`);
    }
}

function subcollection(s) {
    // Process argument union(s) from method overloads
    let e, t;
    __PRIVATE_isString$1(s) ? (e = s, t = {}) : ({path: e, ...t} = s);
    // Create stage object
        const n = new ia(e, t);
    return new fa(void 0, void 0, void 0, [ n ]);
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
 */ class Pipeline extends fa {
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
    newPipeline(a, s) {
        return new Pipeline(a, this.userDataReader, this._userDataWriter, s);
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
 */ function execute(a) {
    const s = a instanceof fa ? {
        pipeline: a
    } : a, {pipeline: t, rawOptions: n, ...i} = s;
    if (!t._db) return Promise.reject(new e(ta.FAILED_PRECONDITION, "This pipeline was created without a database (e.g., as a subcollection pipeline) and cannot be executed directly. It can only be used as part of another pipeline."));
    const r = ra(t._db, da), o = oa(r), c = la(r).createContext(3 /* UserDataSource.Argument */ , "execute");
    t._readUserData(c);
    const l = new ua(r), u = new pa(i, n);
    u._readUserData(c);
    const p = new ma(t, u);
    return ha(o, p).then((a => {
        // Get the execution time from the first result.
        // firestoreClientExecutePipeline returns at least one PipelineStreamElement
        // even if the returned document set is empty.
        const s = a.length > 0 ? a[0].executionTime?.toTimestamp() : void 0, e = a.filter((a => !!a.fields)).map((a => new PipelineResult(l, a.fields, a.key?.path ? new aa(r, null, a.key) : void 0, a.createTime?.toTimestamp(), a.updateTime?.toTimestamp())));
        return new PipelineSnapshot(t, e, s);
    }));
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
da.prototype.pipeline = function() {
    const a = la(this);
    return new PipelineSource(this._databaseId, a, (s => new Pipeline(this, a, new ua(this), s)));
};

export { k as AggregateFunction, c as AliasedExpression, aa as DocumentReference, t as Expression, o as Field, da as Firestore, y as FunctionExpression, Pipeline, PipelineResult, PipelineSnapshot, PipelineSource, n as VectorValue, b as array, i as constant, j as documentMatches, execute, s as field, h as map, pipelineResultEqual, subcollection };
//# sourceMappingURL=pipelines.esm.js.map
