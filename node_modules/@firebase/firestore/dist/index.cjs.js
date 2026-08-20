'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var app = require('@firebase/app');
var component = require('@firebase/component');
var common = require('./common-BiV89iPa.cjs.js');
var util = require('@firebase/util');
require('@firebase/webchannel-wrapper/bloom-blob');
require('@firebase/logger');
require('@firebase/webchannel-wrapper/webchannel-blob');
require('re2js');

/**
 * @license
 * Copyright 2022 Google LLC
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
 * Represents an aggregation that can be performed by Firestore.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AggregateField {
    /**
     * Create a new AggregateField<T>
     * @param aggregateType - Specifies the type of aggregation operation to perform.
     * @param _internalFieldPath - Optionally specifies the field that is aggregated.
     * @internal
     */
    constructor(e = "count", t) {
        this._internalFieldPath = t, 
        /** A type string to uniquely identify instances of this class. */
        this.type = "AggregateField", this.aggregateType = e;
    }
}

/**
 * The results of executing an aggregation query.
 */ class AggregateQuerySnapshot {
    /** @hideconstructor */
    constructor(e, t, n) {
        this._userDataWriter = t, this._data = n, 
        /** A type string to uniquely identify instances of this class. */
        this.type = "AggregateQuerySnapshot", this.query = e;
    }
    /**
     * Returns the results of the aggregations performed over the underlying
     * query.
     *
     * The keys of the returned object will be the same as those of the
     * `AggregateSpec` object specified to the aggregation method, and the values
     * will be the corresponding aggregation result.
     *
     * @returns The results of the aggregations performed over the underlying
     * query.
     */    data() {
        return this._userDataWriter.convertObjectMap(this._data);
    }
    /**
     * @internal
     * @private
     *
     * Retrieves all fields in the snapshot as a proto value.
     *
     * @returns An `Object` containing all fields in the snapshot.
     */    _fieldsProto() {
        // Return the cloned value to prevent manipulation of the Snapshot's data
        return new common.ObjectValue({
            mapValue: {
                fields: this._data
            }
        }).clone().value.mapValue.fields;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
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
 */ function __PRIVATE_validateHasExplicitOrderByForLimitToLast(e) {
    if ("L" /* LimitType.Last */ === e.limitType && 0 === e.explicitOrderBy.length) throw new common.e(common.ta.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * An `AppliableConstraint` is an abstraction of a constraint that can be applied
 * to a Firestore query.
 */ class AppliableConstraint {}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * (endBefore:1)}, {@link (endAt:1)}, {@link limit}, {@link limitToLast} and
 * can then be passed to {@link (query:1)} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ class QueryConstraint extends AppliableConstraint {}

function query(e, t, ...n) {
    let r = [];
    t instanceof AppliableConstraint && r.push(t), r = r.concat(n), function __PRIVATE_validateQueryConstraintArray(e) {
        const t = e.filter((e => e instanceof QueryCompositeFilterConstraint)).length, n = e.filter((e => e instanceof QueryFieldFilterConstraint)).length;
        if (t > 1 || t > 0 && n > 0) throw new common.e(common.ta.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
    }
    /**
 * @license
 * Copyright 2022 Google LLC
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
 * Create an AggregateField object that can be used to compute the sum of
 * a specified field over a range of documents in the result set of a query.
 * @param field - Specifies the field to sum across the result set.
 */ (r);
    for (const t of r) e = t._apply(e);
    return e;
}

/**
 * A `QueryFieldFilterConstraint` is used to narrow the set of documents returned by
 * a Firestore query by filtering on one or more document fields.
 * `QueryFieldFilterConstraint`s are created by invoking {@link where} and can then
 * be passed to {@link (query:1)} to create a new query instance that also contains
 * this `QueryFieldFilterConstraint`.
 */ class QueryFieldFilterConstraint extends QueryConstraint {
    /**
     * @internal
     */
    constructor(e, t, n) {
        super(), this._field = e, this._op = t, this._value = n, 
        /** The type of this query constraint */
        this.type = "where";
    }
    static _create(e, t, n) {
        return new QueryFieldFilterConstraint(e, t, n);
    }
    _apply(e) {
        const t = this._parse(e);
        return __PRIVATE_validateNewFieldFilter(e._query, t), new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithAddedFilter(e._query, t));
    }
    _parse(e) {
        const t = common.la(e.firestore), n = function __PRIVATE_newQueryFilter(e, t, n, r, s, a, o) {
            let i;
            if (s.isKeyField()) {
                if ("array-contains" /* Operator.ARRAY_CONTAINS */ === a || "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ === a) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid Query. You can't perform '${a}' queries on documentId().`);
                if ("in" /* Operator.IN */ === a || "not-in" /* Operator.NOT_IN */ === a) {
                    __PRIVATE_validateDisjunctiveFilterElements(o, a);
                    const t = [];
                    for (const n of o) t.push(__PRIVATE_parseDocumentIdValue(r, e, n));
                    i = {
                        arrayValue: {
                            values: t
                        }
                    };
                } else i = __PRIVATE_parseDocumentIdValue(r, e, o);
            } else "in" /* Operator.IN */ !== a && "not-in" /* Operator.NOT_IN */ !== a && "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ !== a || __PRIVATE_validateDisjunctiveFilterElements(o, a), 
            i = common.__PRIVATE_parseQueryValue(n, t, o, 
            /* allowArrays= */ "in" /* Operator.IN */ === a || "not-in" /* Operator.NOT_IN */ === a);
            const c = common.FieldFilter.create(s, a, i);
            return c;
        }(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value);
        return n;
    }
}

/**
 * Creates a {@link QueryFieldFilterConstraint} that enforces that documents
 * must contain the specified field and that the value should satisfy the
 * relation constraint provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link QueryFieldFilterConstraint}.
 */ function where(e, t, n) {
    const r = t, s = common.K("where", e);
    return QueryFieldFilterConstraint._create(s, r, n);
}

/**
 * A `QueryCompositeFilterConstraint` is used to narrow the set of documents
 * returned by a Firestore query by performing the logical OR or AND of multiple
 * {@link QueryFieldFilterConstraint}s or {@link QueryCompositeFilterConstraint}s.
 * `QueryCompositeFilterConstraint`s are created by invoking {@link or} or
 * {@link and} and can then be passed to {@link (query:1)} to create a new query
 * instance that also contains the `QueryCompositeFilterConstraint`.
 */ class QueryCompositeFilterConstraint extends AppliableConstraint {
    /**
     * @internal
     */
    constructor(
    /** The type of this query constraint */
    e, t) {
        super(), this.type = e, this._queryConstraints = t;
    }
    static _create(e, t) {
        return new QueryCompositeFilterConstraint(e, t);
    }
    _parse(e) {
        const t = this._queryConstraints.map((t => t._parse(e))).filter((e => e.getFilters().length > 0));
        return 1 === t.length ? t[0] : common.CompositeFilter.create(t, this._getOperator());
    }
    _apply(e) {
        const t = this._parse(e);
        return 0 === t.getFilters().length ? e : (function __PRIVATE_validateNewFilter(e, t) {
            let n = e;
            const r = t.getFlattenedFilters();
            for (const e of r) __PRIVATE_validateNewFieldFilter(n, e), n = common.__PRIVATE_queryWithAddedFilter(n, e);
        }
        // Checks if any of the provided filter operators are included in the given list of filters and
        // returns the first one that is, or null if none are.
        (e._query, t), new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithAddedFilter(e._query, t)));
    }
    _getQueryConstraints() {
        return this._queryConstraints;
    }
    _getOperator() {
        return "and" === this.type ? "and" /* CompositeOperator.AND */ : "or" /* CompositeOperator.OR */;
    }
}

/**
 * Creates a new {@link QueryCompositeFilterConstraint} that is a disjunction of
 * the given filter constraints. A disjunction filter includes a document if it
 * satisfies any of the given filters.
 *
 * @param queryConstraints - Optional. The list of
 * {@link QueryFilterConstraint}s to perform a disjunction for. These must be
 * created with calls to {@link where}, {@link or}, or {@link and}.
 * @returns The newly created {@link QueryCompositeFilterConstraint}.
 */ function or(...e) {
    // Only support QueryFilterConstraints
    return e.forEach((e => __PRIVATE_validateQueryFilterConstraint("or", e))), QueryCompositeFilterConstraint._create("or" /* CompositeOperator.OR */ , e);
}

/**
 * Creates a new {@link QueryCompositeFilterConstraint} that is a conjunction of
 * the given filter constraints. A conjunction filter includes a document if it
 * satisfies all of the given filters.
 *
 * @param queryConstraints - Optional. The list of
 * {@link QueryFilterConstraint}s to perform a conjunction for. These must be
 * created with calls to {@link where}, {@link or}, or {@link and}.
 * @returns The newly created {@link QueryCompositeFilterConstraint}.
 */ function and(...e) {
    // Only support QueryFilterConstraints
    return e.forEach((e => __PRIVATE_validateQueryFilterConstraint("and", e))), QueryCompositeFilterConstraint._create("and" /* CompositeOperator.AND */ , e);
}

/**
 * A `QueryOrderByConstraint` is used to sort the set of documents returned by a
 * Firestore query. `QueryOrderByConstraint`s are created by invoking
 * {@link orderBy} and can then be passed to {@link (query:1)} to create a new query
 * instance that also contains this `QueryOrderByConstraint`.
 *
 * Note: Documents that do not contain the orderBy field will not be present in
 * the query result.
 */ class QueryOrderByConstraint extends QueryConstraint {
    /**
     * @internal
     */
    constructor(e, t) {
        super(), this._field = e, this._direction = t, 
        /** The type of this query constraint */
        this.type = "orderBy";
    }
    static _create(e, t) {
        return new QueryOrderByConstraint(e, t);
    }
    _apply(e) {
        const t = function __PRIVATE_newQueryOrderBy(e, t, n) {
            if (null !== e.startAt) throw new common.e(common.ta.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== e.endAt) throw new common.e(common.ta.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            const r = new common.OrderBy(t, n);
            return r;
        }
        /**
 * Create a `Bound` from a query and a document.
 *
 * Note that the `Bound` will always include the key of the document
 * and so only the provided document will compare equal to the returned
 * position.
 *
 * Will throw if the document does not contain all fields of the order by
 * of the query or if any of the fields in the order by are an uncommitted
 * server timestamp.
 */ (e._query, this._field, this._direction);
        return new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithAddedOrderBy(e._query, t));
    }
}

/**
 * Creates a {@link QueryOrderByConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * Note: Documents that do not contain the specified field will not be present
 * in the query result.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link QueryOrderByConstraint}.
 */ function orderBy(e, t = "asc") {
    const n = t, r = common.K("orderBy", e);
    return QueryOrderByConstraint._create(r, n);
}

/**
 * A `QueryLimitConstraint` is used to limit the number of documents returned by
 * a Firestore query.
 * `QueryLimitConstraint`s are created by invoking {@link limit} or
 * {@link limitToLast} and can then be passed to {@link (query:1)} to create a new
 * query instance that also contains this `QueryLimitConstraint`.
 */ class QueryLimitConstraint extends QueryConstraint {
    /**
     * @internal
     */
    constructor(
    /** The type of this query constraint */
    e, t, n) {
        super(), this.type = e, this._limit = t, this._limitType = n;
    }
    static _create(e, t, n) {
        return new QueryLimitConstraint(e, t, n);
    }
    _apply(e) {
        return new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithLimit(e._query, this._limit, this._limitType));
    }
}

/**
 * Creates a {@link QueryLimitConstraint} that only returns the first matching
 * documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link QueryLimitConstraint}.
 */ function limit(e) {
    return common.__PRIVATE_validatePositiveNumber("limit", e), QueryLimitConstraint._create("limit", e, "F" /* LimitType.First */);
}

/**
 * Creates a {@link QueryLimitConstraint} that only returns the last matching
 * documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link QueryLimitConstraint}.
 */ function limitToLast(e) {
    return common.__PRIVATE_validatePositiveNumber("limitToLast", e), QueryLimitConstraint._create("limitToLast", e, "L" /* LimitType.Last */);
}

/**
 * A `QueryStartAtConstraint` is used to exclude documents from the start of a
 * result set returned by a Firestore query.
 * `QueryStartAtConstraint`s are created by invoking {@link (startAt:1)} or
 * {@link (startAfter:1)} and can then be passed to {@link (query:1)} to create a
 * new query instance that also contains this `QueryStartAtConstraint`.
 */ class QueryStartAtConstraint extends QueryConstraint {
    /**
     * @internal
     */
    constructor(
    /** The type of this query constraint */
    e, t, n) {
        super(), this.type = e, this._docOrFields = t, this._inclusive = n;
    }
    static _create(e, t, n) {
        return new QueryStartAtConstraint(e, t, n);
    }
    _apply(e) {
        const t = __PRIVATE_newQueryBoundFromDocOrFields(e, this.type, this._docOrFields, this._inclusive);
        return new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithStartAt(e._query, t));
    }
}

function startAt(...e) {
    return QueryStartAtConstraint._create("startAt", e, 
    /*inclusive=*/ true);
}

function startAfter(...e) {
    return QueryStartAtConstraint._create("startAfter", e, 
    /*inclusive=*/ false);
}

/**
 * A `QueryEndAtConstraint` is used to exclude documents from the end of a
 * result set returned by a Firestore query.
 * `QueryEndAtConstraint`s are created by invoking {@link (endAt:1)} or
 * {@link (endBefore:1)} and can then be passed to {@link (query:1)} to create a new
 * query instance that also contains this `QueryEndAtConstraint`.
 */ class QueryEndAtConstraint extends QueryConstraint {
    /**
     * @internal
     */
    constructor(
    /** The type of this query constraint */
    e, t, n) {
        super(), this.type = e, this._docOrFields = t, this._inclusive = n;
    }
    static _create(e, t, n) {
        return new QueryEndAtConstraint(e, t, n);
    }
    _apply(e) {
        const t = __PRIVATE_newQueryBoundFromDocOrFields(e, this.type, this._docOrFields, this._inclusive);
        return new common.Query(e.firestore, e.converter, common.__PRIVATE_queryWithEndAt(e._query, t));
    }
}

function endBefore(...e) {
    return QueryEndAtConstraint._create("endBefore", e, 
    /*inclusive=*/ false);
}

function endAt(...e) {
    return QueryEndAtConstraint._create("endAt", e, 
    /*inclusive=*/ true);
}

/** Helper function to create a bound from a document or fields */ function __PRIVATE_newQueryBoundFromDocOrFields(e, t, n, r) {
    if (n[0] = util.getModularInstance(n[0]), n[0] instanceof common.mr) return function __PRIVATE_newQueryBoundFromDocument(e, t, n, r, s) {
        if (!r) throw new common.e(common.ta.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
        const a = [];
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
                for (const n of common.__PRIVATE_queryNormalizedOrderBy(e)) if (n.field.isKeyField()) a.push(common.__PRIVATE_refValue(t, r.key)); else {
            const e = r.data.field(n.field);
            if (common.__PRIVATE_isServerTimestamp(e)) throw new common.e(common.ta.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === e) {
                const e = n.field.canonicalString();
                throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`);
            }
            a.push(e);
        }
        return new common.Bound(a, s);
    }
    /**
 * Converts a list of field values to a `Bound` for the given query.
 */ (e._query, e.firestore._databaseId, t, n[0]._document, r);
    {
        const s = common.la(e.firestore);
        return function __PRIVATE_newQueryBoundFromFields(e, t, n, r, s, a) {
            // Use explicit order by's because it has to match the query the user made
            const o = e.explicitOrderBy;
            if (s.length > o.length) throw new common.e(common.ta.INVALID_ARGUMENT, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
            const i = [];
            for (let a = 0; a < s.length; a++) {
                const c = s[a];
                if (o[a].field.isKeyField()) {
                    if ("string" != typeof c) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
                    if (!common.__PRIVATE_isCollectionGroupQuery(e) && -1 !== c.indexOf("/")) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
                    const n = e.path.child(common.ResourcePath.fromString(c));
                    if (!common.DocumentKey.isDocumentKey(n)) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                    const s = new common.DocumentKey(n);
                    i.push(common.__PRIVATE_refValue(t, s));
                } else {
                    const e = common.__PRIVATE_parseQueryValue(n, r, c);
                    i.push(e);
                }
            }
            return new common.Bound(i, a);
        }
        /**
 * Parses the given `documentIdValue` into a `ReferenceValue`, throwing
 * appropriate errors if the value is anything other than a `DocumentReference`
 * or `string`, or if the string is malformed.
 */ (e._query, e.firestore._databaseId, s, t, n, r);
    }
}

function __PRIVATE_parseDocumentIdValue(e, t, n) {
    if ("string" == typeof (n = util.getModularInstance(n))) {
        if ("" === n) throw new common.e(common.ta.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!common.__PRIVATE_isCollectionGroupQuery(t) && -1 !== n.indexOf("/")) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
        const r = t.path.child(common.ResourcePath.fromString(n));
        if (!common.DocumentKey.isDocumentKey(r)) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
        return common.__PRIVATE_refValue(e, new common.DocumentKey(r));
    }
    if (n instanceof common.aa) return common.__PRIVATE_refValue(e, n._key);
    throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${common.__PRIVATE_valueDescription(n)}.`);
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function __PRIVATE_validateDisjunctiveFilterElements(e, t) {
    if (!Array.isArray(e) || 0 === e.length) throw new common.e(common.ta.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`);
}

/**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * This is not a comprehensive check, and this function should be removed in the
 * long term. Validations should occur in the Firestore backend.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one inequality per query.
 * 2. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
 */ function __PRIVATE_validateNewFieldFilter(e, t) {
    const n = function __PRIVATE_findOpInsideFilters(e, t) {
        for (const n of e) for (const e of n.getFlattenedFilters()) if (t.indexOf(e.op) >= 0) return e.op;
        return null;
    }(e.filters, function __PRIVATE_conflictingOps(e) {
        switch (e) {
          case "!=" /* Operator.NOT_EQUAL */ :
            return [ "!=" /* Operator.NOT_EQUAL */ , "not-in" /* Operator.NOT_IN */ ];

          case "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ :
          case "in" /* Operator.IN */ :
            return [ "not-in" /* Operator.NOT_IN */ ];

          case "not-in" /* Operator.NOT_IN */ :
            return [ "array-contains-any" /* Operator.ARRAY_CONTAINS_ANY */ , "in" /* Operator.IN */ , "not-in" /* Operator.NOT_IN */ , "!=" /* Operator.NOT_EQUAL */ ];

          default:
            return [];
        }
    }(t.op));
    if (null !== n) 
    // Special case when it's a duplicate op to give a slightly clearer error message.
    throw n === t.op ? new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`) : new common.e(common.ta.INVALID_ARGUMENT, `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`);
}

function __PRIVATE_validateQueryFilterConstraint(e, t) {
    if (!(t instanceof QueryFieldFilterConstraint || t instanceof QueryCompositeFilterConstraint)) throw new common.e(common.ta.INVALID_ARGUMENT, `Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`);
}

function sum(e) {
    return new AggregateField("sum", common.K("sum", e));
}

/**
 * Create an AggregateField object that can be used to compute the average of
 * a specified field over a range of documents in the result set of a query.
 * @param field - Specifies the field to average across the result set.
 */ function average(e) {
    return new AggregateField("avg", common.K("average", e));
}

/**
 * Create an AggregateField object that can be used to compute the count of
 * documents in the result set of a query.
 */ function count() {
    return new AggregateField("count");
}

/**
 * Compares two 'AggregateField` instances for equality.
 *
 * @param left - Compare this AggregateField to the `right`.
 * @param right - Compare this AggregateField to the `left`.
 */ function aggregateFieldEqual(e, t) {
    return e instanceof AggregateField && t instanceof AggregateField && e.aggregateType === t.aggregateType && e._internalFieldPath?.canonicalString() === t._internalFieldPath?.canonicalString();
}

/**
 * Compares two `AggregateQuerySnapshot` instances for equality.
 *
 * Two `AggregateQuerySnapshot` instances are considered "equal" if they have
 * underlying queries that compare equal, and the same data.
 *
 * @param left - The first `AggregateQuerySnapshot` to compare.
 * @param right - The second `AggregateQuerySnapshot` to compare.
 *
 * @returns `true` if the objects are "equal", as defined above, or `false`
 * otherwise.
 */ function aggregateQuerySnapshotEqual(e, t) {
    return common.queryEqual(e.query, t.query) && util.deepEqual(e.data(), t.data());
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 */ function __PRIVATE_isPartialObserver(e) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function __PRIVATE_implementsAnyMethods(e, t) {
        if ("object" != typeof e || null === e) return false;
        const n = e;
        for (const e of t) if (e in n && "function" == typeof n[e]) return true;
        return false;
    }
    /**
 * @license
 * Copyright 2022 Google LLC
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
 * Calculates the number of documents in the result set of the given query
 * without actually downloading the documents.
 *
 * Using this function to count the documents is efficient because only the
 * final count, not the documents' data, is downloaded. This function can
 * count the documents in cases where the result set is prohibitively large to
 * download entirely (thousands of documents).
 *
 * The result received from the server is presented, unaltered, without
 * considering any local state. That is, documents in the local cache are not
 * taken into consideration, neither are local modifications not yet
 * synchronized with the server. Previously-downloaded results, if any, are not
 * used. Every invocation of this function necessarily involves a round trip to
 * the server.
 *
 * @param query - The query whose result set size is calculated.
 * @returns A Promise that will be resolved with the count; the count can be
 * retrieved from `snapshot.data().count`, where `snapshot` is the
 * `AggregateQuerySnapshot` to which the returned Promise resolves.
 */ (e, [ "next", "error", "complete" ]);
}

function getCountFromServer(e) {
    return getAggregateFromServer(e, {
        count: count()
    });
}

/**
 * Calculates the specified aggregations over the documents in the result
 * set of the given query without actually downloading the documents.
 *
 * Using this function to perform aggregations is efficient because only the
 * final aggregation values, not the documents' data, are downloaded. This
 * function can perform aggregations of the documents in cases where the result
 * set is prohibitively large to download entirely (thousands of documents).
 *
 * The result received from the server is presented, unaltered, without
 * considering any local state. That is, documents in the local cache are not
 * taken into consideration, neither are local modifications not yet
 * synchronized with the server. Previously-downloaded results, if any, are not
 * used. Every invocation of this function necessarily involves a round trip to
 * the server.
 *
 * @param query - The query whose result set is aggregated over.
 * @param aggregateSpec - An `AggregateSpec` object that specifies the aggregates
 * to perform over the result set. The AggregateSpec specifies aliases for each
 * aggregate, which can be used to retrieve the aggregate result.
 * @example
 * ```typescript
 * const aggregateSnapshot = await getAggregateFromServer(query, {
 *   countOfDocs: count(),
 *   totalHours: sum('hours'),
 *   averageScore: average('score')
 * });
 *
 * const countOfDocs: number = aggregateSnapshot.data().countOfDocs;
 * const totalHours: number = aggregateSnapshot.data().totalHours;
 * const averageScore: number | null = aggregateSnapshot.data().averageScore;
 * ```
 */ function getAggregateFromServer(e, t) {
    const n = common.ra(e.firestore, common.da), r = common.oa(n), s = common.__PRIVATE_mapToArray(t, ((e, t) => new common.__PRIVATE_AggregateImpl(t, e.aggregateType, e._internalFieldPath)));
    // Run the aggregation and convert the results
    return common.__PRIVATE_firestoreClientRunAggregateQuery(r, e._query, s).then((t => 
    /**
 * Converts the core aggregation result to an `AggregateQuerySnapshot`
 * that can be returned to the consumer.
 * @param query
 * @param aggregateResult - Core aggregation result
 * @internal
 */
    function __PRIVATE_convertToAggregateQuerySnapshot(e, t, n) {
        const r = new common.ua(e), s = new AggregateQuerySnapshot(t, r, n);
        return s;
    }
    /**
 * @license
 * Copyright 2023 Google LLC
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
 */ (n, e, t)));
}

class __PRIVATE_MemoryLocalCacheImpl {
    constructor(e) {
        this.kind = "memory", this._onlineComponentProvider = common.OnlineComponentProvider.provider, this._offlineComponentProvider = e?.garbageCollector ? e.garbageCollector._offlineComponentProvider : {
            build: () => new common.__PRIVATE_LruGcMemoryOfflineComponentProvider(void 0)
        };
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
}

class __PRIVATE_PersistentLocalCacheImpl {
    constructor(e) {
        let t;
        this.kind = "persistent", e?.tabManager ? (e.tabManager._initialize(e), t = e.tabManager) : (t = persistentSingleTabManager(void 0), 
        t._initialize(e)), this._onlineComponentProvider = t._onlineComponentProvider, this._offlineComponentProvider = t._offlineComponentProvider;
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
}

class __PRIVATE_MemoryEagerGarbageCollectorImpl {
    constructor() {
        this.kind = "memoryEager", this._offlineComponentProvider = common.__PRIVATE_MemoryOfflineComponentProvider.provider;
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
}

class __PRIVATE_MemoryLruGarbageCollectorImpl {
    constructor(e) {
        this.kind = "memoryLru", this._offlineComponentProvider = {
            build: () => new common.__PRIVATE_LruGcMemoryOfflineComponentProvider(e)
        };
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
}

/**
 * Creates an instance of `MemoryEagerGarbageCollector`. This is also the
 * default garbage collector unless it is explicitly specified otherwise.
 */ function memoryEagerGarbageCollector() {
    return new __PRIVATE_MemoryEagerGarbageCollectorImpl;
}

/**
 * Creates an instance of `MemoryLruGarbageCollector`.
 *
 * A target size can be specified as part of the setting parameter. The
 * collector will start deleting documents once the cache size exceeds
 * the given size. The default cache size is 40MB (40 * 1024 * 1024 bytes).
 */ function memoryLruGarbageCollector(e) {
    return new __PRIVATE_MemoryLruGarbageCollectorImpl(e?.cacheSizeBytes);
}

/**
 * Creates an instance of `MemoryLocalCache`. The instance can be set to
 * `FirestoreSettings.cache` to tell the SDK which cache layer to use.
 */ function memoryLocalCache(e) {
    return new __PRIVATE_MemoryLocalCacheImpl(e);
}

/**
 * Creates an instance of `PersistentLocalCache`. The instance can be set to
 * `FirestoreSettings.cache` to tell the SDK which cache layer to use.
 *
 * Persistent cache cannot be used in a Node.js environment.
 */ function persistentLocalCache(e) {
    return new __PRIVATE_PersistentLocalCacheImpl(e);
}

class __PRIVATE_SingleTabManagerImpl {
    constructor(e) {
        this.forceOwnership = e, this.kind = "persistentSingleTab";
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
    /**
     * @internal
     */    _initialize(e) {
        this._onlineComponentProvider = common.OnlineComponentProvider.provider, this._offlineComponentProvider = {
            build: t => new common.__PRIVATE_IndexedDbOfflineComponentProvider(t, e?.cacheSizeBytes, this.forceOwnership)
        };
    }
}

class __PRIVATE_MultiTabManagerImpl {
    constructor() {
        this.kind = "PersistentMultipleTab";
    }
    toJSON() {
        return {
            kind: this.kind
        };
    }
    /**
     * @internal
     */    _initialize(e) {
        this._onlineComponentProvider = common.OnlineComponentProvider.provider, this._offlineComponentProvider = {
            build: t => new common.__PRIVATE_MultiTabOfflineComponentProvider(t, e?.cacheSizeBytes)
        };
    }
}

/**
 * Creates an instance of `PersistentSingleTabManager`.
 *
 * @param settings - Configures the created tab manager.
 */ function persistentSingleTabManager(e) {
    return new __PRIVATE_SingleTabManagerImpl(e?.forceOwnership);
}

/**
 * Creates an instance of `PersistentMultipleTabManager`.
 */ function persistentMultipleTabManager() {
    return new __PRIVATE_MultiTabManagerImpl;
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 */ const Qe = {
    maxAttempts: 5
};

/**
 * @license
 * Copyright 2020 Google LLC
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
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */
class WriteBatch {
    /** @hideconstructor */
    constructor(e, t) {
        this._firestore = e, this._commitHandler = t, this._mutations = [], this._committed = false, 
        this._dataReader = common.la(e);
    }
    set(e, t, n) {
        this._verifyNotCommitted();
        const r = __PRIVATE_validateReference(e, this._firestore), s = common.__PRIVATE_applyFirestoreDataConverter(r.converter, t, n), a = common.__PRIVATE_parseSetData(this._dataReader, "WriteBatch.set", r._key, s, null !== r.converter, n);
        return this._mutations.push(a.toMutation(r._key, common.Precondition.none())), this;
    }
    update(e, t, n, ...r) {
        this._verifyNotCommitted();
        const s = __PRIVATE_validateReference(e, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let a;
        return a = "string" == typeof (t = util.getModularInstance(t)) || t instanceof common.FieldPath ? common.__PRIVATE_parseUpdateVarargs(this._dataReader, "WriteBatch.update", s._key, t, n, r) : common.__PRIVATE_parseUpdateData(this._dataReader, "WriteBatch.update", s._key, t), 
        this._mutations.push(a.toMutation(s._key, common.Precondition.exists(true))), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */    delete(e) {
        this._verifyNotCommitted();
        const t = __PRIVATE_validateReference(e, this._firestore);
        return this._mutations = this._mutations.concat(new common.__PRIVATE_DeleteMutation(t._key, common.Precondition.none())), this;
    }
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */    commit() {
        return this._verifyNotCommitted(), this._committed = true, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }
    _verifyNotCommitted() {
        if (this._committed) throw new common.e(common.ta.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }
}

function __PRIVATE_validateReference(e, t) {
    if ((e = util.getModularInstance(e)).firestore !== t) throw new common.e(common.ta.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return e;
}

/**
 * @license
 * Copyright 2020 Google LLC
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
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ let xe = class Transaction {
    /** @hideconstructor */
    constructor(e, t) {
        this._firestore = e, this._transaction = t, this._dataReader = common.la(e);
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(e) {
        const t = __PRIVATE_validateReference(e, this._firestore), n = new common.__PRIVATE_LiteUserDataWriter(this._firestore);
        return this._transaction.lookup([ t._key ]).then((e => {
            if (!e || 1 !== e.length) return common.l(24041);
            const r = e[0];
            if (r.isFoundDocument()) return new common.mr(this._firestore, n, r.key, r, t.converter);
            if (r.isNoDocument()) return new common.mr(this._firestore, n, t._key, null, t.converter);
            throw common.l(18433, {
                doc: r
            });
        }));
    }
    set(e, t, n) {
        const r = __PRIVATE_validateReference(e, this._firestore), s = common.__PRIVATE_applyFirestoreDataConverter(r.converter, t, n), a = common.__PRIVATE_parseSetData(this._dataReader, "Transaction.set", r._key, s, null !== r.converter, n);
        return this._transaction.set(r._key, a), this;
    }
    update(e, t, n, ...r) {
        const s = __PRIVATE_validateReference(e, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let a;
        return a = "string" == typeof (t = util.getModularInstance(t)) || t instanceof common.FieldPath ? common.__PRIVATE_parseUpdateVarargs(this._dataReader, "Transaction.update", s._key, t, n, r) : common.__PRIVATE_parseUpdateData(this._dataReader, "Transaction.update", s._key, t), 
        this._transaction.update(s._key, a), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */    delete(e) {
        const t = __PRIVATE_validateReference(e, this._firestore);
        return this._transaction.delete(t._key), this;
    }
};

/**
 * @license
 * Copyright 2020 Google LLC
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
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ class Transaction extends xe {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    constructor(e, t) {
        super(e, t), this._firestore = e;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(e) {
        const t = __PRIVATE_validateReference(e, this._firestore), n = new common.ua(this._firestore);
        return super.get(e).then((e => new common.DocumentSnapshot(this._firestore, n, t._key, e._document, new common.SnapshotMetadata(
        /* hasPendingWrites= */ false, 
        /* fromCache= */ false), t.converter)));
    }
}

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @param options - An options object to configure maximum number of attempts to
 * commit.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ function runTransaction(e, t, n) {
    e = common.ra(e, common.da);
    const r = {
        ...Qe,
        ...n
    };
    !function __PRIVATE_validateTransactionOptions(e) {
        if (e.maxAttempts < 1) throw new common.e(common.ta.INVALID_ARGUMENT, "Max attempts must be at least 1");
    }(r);
    const s = common.oa(e);
    return common.__PRIVATE_firestoreClientTransaction(s, (n => t(new Transaction(e, n))), r);
}

/**
 * @license
 * Copyright 2020 Google LLC
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
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A `Promise` that resolves with a `DocumentSnapshot` containing the
 * document contents.
 */ function getDoc(e) {
    e = common.ra(e, common.aa);
    const t = common.ra(e.firestore, common.da), n = common.oa(t);
    return common.__PRIVATE_firestoreClientGetDocumentViaSnapshotListener(n, e._key).then((n => __PRIVATE_convertToDocSnapshot(t, e, n)));
}

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` that resolves with a `DocumentSnapshot` containing the
 * document contents.
 */ function getDocFromCache(e) {
    e = common.ra(e, common.aa);
    const t = common.ra(e.firestore, common.da), n = common.oa(t), r = new common.ua(t);
    return common.__PRIVATE_firestoreClientGetDocumentFromLocalCache(n, e._key).then((n => new common.DocumentSnapshot(t, r, e._key, n, new common.SnapshotMetadata(null !== n && n.hasLocalMutations, 
    /* fromCache= */ true), e.converter)));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` that resolves with a `DocumentSnapshot` containing the
 * document contents.
 */ function getDocFromServer(e) {
    e = common.ra(e, common.aa);
    const t = common.ra(e.firestore, common.da), n = common.oa(t);
    return common.__PRIVATE_firestoreClientGetDocumentViaSnapshotListener(n, e._key, {
        source: "server"
    }).then((n => __PRIVATE_convertToDocSnapshot(t, e, n)));
}

function getDocs(e) {
    e = common.ra(e, common.Query);
    const t = common.ra(e.firestore, common.da), n = common.oa(t), r = new common.ua(t);
    return __PRIVATE_validateHasExplicitOrderByForLimitToLast(e._query), common.__PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, e._query).then((n => new common.QuerySnapshot(t, r, e, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an empty result set if no documents matching the query are currently
 * cached.
 *
 * @returns A `Promise` that resolves with the results of the query.
 */ function getDocsFromCache(e) {
    e = common.ra(e, common.Query);
    const t = common.ra(e.firestore, common.da), n = common.oa(t), r = new common.ua(t);
    return common.__PRIVATE_firestoreClientGetDocumentsFromLocalCache(n, e._query).then((n => new common.QuerySnapshot(t, r, e, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that resolves with the results of the query.
 */ function getDocsFromServer(e) {
    e = common.ra(e, common.Query);
    const t = common.ra(e.firestore, common.da), n = common.oa(t), r = new common.ua(t);
    return common.__PRIVATE_firestoreClientGetDocumentsViaSnapshotListener(n, e._query, {
        source: "server"
    }).then((n => new common.QuerySnapshot(t, r, e, n)));
}

function setDoc(e, t, n) {
    e = common.ra(e, common.aa);
    const r = common.ra(e.firestore, common.da), s = common.__PRIVATE_applyFirestoreDataConverter(e.converter, t, n), a = common.la(r);
    return executeWrite(r, [ common.__PRIVATE_parseSetData(a, "setDoc", e._key, s, null !== e.converter, n).toMutation(e._key, common.Precondition.none()) ]);
}

function updateDoc(e, t, n, ...r) {
    e = common.ra(e, common.aa);
    const s = common.ra(e.firestore, common.da), a = common.la(s);
    let o;
    o = "string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    t = util.getModularInstance(t)) || t instanceof common.FieldPath ? common.__PRIVATE_parseUpdateVarargs(a, "updateDoc", e._key, t, n, r) : common.__PRIVATE_parseUpdateData(a, "updateDoc", e._key, t);
    return executeWrite(s, [ o.toMutation(e._key, common.Precondition.exists(true)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * Note that the returned `Promise` does _not_ resolve until the document is
 * successfully deleted from the remote Firestore backend and, similarly, is not
 * rejected until the remote Firestore backend reports an error deleting the given
 * document. So if the client cannot reach the backend (for example, due to being
 * offline) then the returned `Promise` will not resolve for a potentially-long
 * time (for example, until the client has gone back online). That being said,
 * the given data _will_ be immediately deleted from the local cache and will be
 * reflected in future "get" operations as if it had been successfully
 * deleted from the remote Firestore server, a feature of Firestore called
 * "latency compensation". The document will _eventually_ be deleted from the remote
 * Firestore backend once a connection can be established. Therefore, it is
 * usually undesirable to `await` the `Promise` returned from this function
 * because the indefinite amount of time before which the promise resolves or
 * rejects can block application logic unnecessarily.
 *
 * @param reference - A reference to the document to delete.
 * @returns A `Promise` that resolves once the document has been successfully
 * deleted from the backend or rejects once the backend reports an error
 * deleting the document.
 */ function deleteDoc(e) {
    return executeWrite(common.ra(e.firestore, common.da), [ new common.__PRIVATE_DeleteMutation(e._key, common.Precondition.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * Note that the returned `Promise` does _not_ resolve until the document is
 * successfully created to the remote Firestore backend and, similarly, is not
 * rejected until the remote Firestore backend reports an error creating the given
 * document. So if the client cannot reach the backend (for example, due to being
 * offline) then the returned `Promise` will not resolve for a potentially-long
 * time (for example, until the client has gone back online). That being said,
 * the given document _will_ be immediately created in the local cache and will be
 * incorporated into future "get" operations as if it had been successfully
 * created in the remote Firestore server, a feature of Firestore called
 * "latency compensation". The document will _eventually_ be created in the remote
 * Firestore backend once a connection can be established. Therefore, it is
 * usually undesirable to `await` the `Promise` returned from this function
 * because the indefinite amount of time before which the promise resolves or
 * rejects can block application logic unnecessarily.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` that resolves once the docoument has been successfully
 * created in the backend or rejects once the backend reports an error creating
 * the document.
 */ function addDoc(e, t) {
    const n = common.ra(e.firestore, common.da), r = common.doc(e), s = common.__PRIVATE_applyFirestoreDataConverter(e.converter, t), a = common.la(e.firestore);
    return executeWrite(n, [ common.__PRIVATE_parseSetData(a, "addDoc", r._key, s, null !== e.converter, {}).toMutation(r._key, common.Precondition.exists(false)) ]).then((() => r));
}

function onSnapshot(e, ...t) {
    // onSnapshot for Query or Document.
    e = util.getModularInstance(e);
    let n = {
        includeMetadataChanges: false,
        source: "default"
    }, r = 0;
    "object" != typeof t[r] || __PRIVATE_isPartialObserver(t[r]) || (n = t[r++]);
    const s = {
        includeMetadataChanges: n.includeMetadataChanges,
        source: n.source
    };
    if (__PRIVATE_isPartialObserver(t[r])) {
        const e = t[r];
        t[r] = e.next?.bind(e), t[r + 1] = e.error?.bind(e), t[r + 2] = e.complete?.bind(e);
    }
    let a, i, c;
    if (e instanceof common.aa) i = common.ra(e.firestore, common.da), c = common.__PRIVATE_newQueryForPath(e._key.path), a = {
        next: n => {
            t[r] && t[r](__PRIVATE_convertToDocSnapshot(i, e, n));
        },
        error: t[r + 1],
        complete: t[r + 2]
    }; else {
        const n = common.ra(e, common.Query);
        i = common.ra(n.firestore, common.da), c = n._query;
        const s = new common.ua(i);
        a = {
            next: e => {
                t[r] && t[r](new common.QuerySnapshot(i, s, n, e));
            },
            error: t[r + 1],
            complete: t[r + 2]
        }, __PRIVATE_validateHasExplicitOrderByForLimitToLast(e._query);
    }
    const u = common.oa(i);
    return common.__PRIVATE_firestoreClientListen(u, c, s, a);
}

function onSnapshotResume(e, t, ...n) {
    const r = util.getModularInstance(e), s = 
    /**
 * Ensures the data required to construct an {@link onSnapshot} listener exist in a `snapshotJson`
 * object that originates from {@link DocumentSnapshot.toJSON} or {@link Querysnapshot.toJSON}. The
 * data is normalized into a typed object.
 *
 * @param snapshotJson - The JSON object that the app provided to {@link onSnapshot}.
 * @returns A normalized object that contains all of the required bundle JSON fields. If
 * {@link snapshotJson} doesn't contain the required fields, or if the fields exist as empty
 * strings, then the {@link snapshotJson.error} field will be a non empty string.
 *
 * @internal
 */
    function __PRIVATE_normalizeSnapshotJsonFields(e) {
        const t = {
            bundle: "",
            bundleName: "",
            bundleSource: ""
        }, n = [ "bundle", "bundleName", "bundleSource" ];
        for (const r of n) {
            if (!(r in e)) {
                t.error = `snapshotJson missing required field: ${r}`;
                break;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const n = e[r];
            if ("string" != typeof n) {
                t.error = `snapshotJson field '${r}' must be a string.`;
                break;
            }
            if (0 === n.length) {
                t.error = `snapshotJson field '${r}' cannot be an empty string.`;
                break;
            }
            "bundle" === r ? t.bundle = n : "bundleName" === r ? t.bundleName = n : "bundleSource" === r && (t.bundleSource = n);
        }
        return t;
    }
    /**
 * Loads the bundle in a separate task and then invokes {@link onSnapshot} with a
 * {@link DocumentReference} for the document in the bundle.
 *
 * @param firestore - The {@link Firestore} instance for the {@link onSnapshot} operation request.
 * @param json - The JSON bundle to load, produced by {@link DocumentSnapshot.toJSON}.
 * @param options - Options controlling the listen behavior.
 * @param observer - A single object containing `next` and `error` callbacks.
 * @param converter - An optional object that converts objects from Firestore before the onNext
 * listener is invoked.
 * @returns An unsubscribe function that can be called to cancel the snapshot
 * listener.
 *
 * @internal
 */ (t);
    if (s.error) throw new common.e(common.ta.INVALID_ARGUMENT, s.error);
    let a, o = 0;
    if ("object" != typeof n[o] || __PRIVATE_isPartialObserver(n[o]) || (a = n[o++]), 
    "QuerySnapshot" === s.bundleSource) {
        let e = null;
        if ("object" == typeof n[o] && __PRIVATE_isPartialObserver(n[o])) {
            const t = n[o++];
            e = {
                next: t.next,
                error: t.error,
                complete: t.complete
            };
        } else e = {
            next: n[o++],
            error: n[o++],
            complete: n[o++]
        };
        /**
 * Loads the bundle in a separate task and then invokes {@link onSnapshot} with a
 * {@link Query} that represents the Query in the bundle.
 *
 * @param firestore - The {@link Firestore} instance for the {@link onSnapshot} operation request.
 * @param json - The JSON bundle to load, produced by {@link QuerySnapshot.toJSON}.
 * @param options - Options controlling the listen behavior.
 * @param observer - A single object containing `next` and `error` callbacks.
 * @param converter - An optional object that converts objects from Firestore before the onNext
 * listener is invoked.
 * @returns An unsubscribe function that can be called to cancel the snapshot
 * listener.
 *
 * @internal
 */
        return function __PRIVATE_onSnapshotQuerySnapshotBundle(e, t, n, r, s) {
            let a, o = false;
            const i = common.loadBundle(e, t.bundle);
            return i.then((() => common.namedQuery(e, t.bundleName))).then((e => {
                if (e && !o) {
                    s && e.withConverter(s), a = onSnapshot(e, n || {}, r);
                }
            })).catch((e => (r.error && r.error(e), () => {}))), () => {
                o || (o = true, a && a());
            };
        }
        /**
 * @license
 * Copyright 2020 Google LLC
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
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ (r, s, a, e, n[o]);
    }
    if ("DocumentSnapshot" === s.bundleSource) {
        let e = null;
        if ("object" == typeof n[o] && __PRIVATE_isPartialObserver(n[o])) {
            const t = n[o++];
            e = {
                next: t.next,
                error: t.error,
                complete: t.complete
            };
        } else e = {
            next: n[o++],
            error: n[o++],
            complete: n[o++]
        };
        return function __PRIVATE_onSnapshotDocumentSnapshotBundle(e, t, n, r, s) {
            let a, o = false;
            const i = common.loadBundle(e, t.bundle);
            return i.then((() => {
                if (!o) {
                    const o = new common.aa(e, s || null, common.DocumentKey.fromPath(t.bundleName));
                    a = onSnapshot(o, n || {}, r);
                }
            })).catch((e => (r.error && r.error(e), () => {}))), () => {
                o || (o = true, a && a());
            };
        }(r, s, a, e, n[o]);
    }
    throw new common.e(common.ta.INVALID_ARGUMENT, `unsupported bundle source: ${s.bundleSource}`);
}

function onSnapshotsInSync(e, t) {
    e = common.ra(e, common.da);
    const n = common.oa(e), r = __PRIVATE_isPartialObserver(t) ? t : {
        next: t
    };
    return common.__PRIVATE_firestoreClientAddSnapshotsInSyncListener(n, r);
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function executeWrite(e, t) {
    const n = common.oa(e);
    return common.__PRIVATE_firestoreClientWrite(n, t);
}

/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */ function __PRIVATE_convertToDocSnapshot(e, t, n) {
    const r = n.docs.get(t._key), s = new common.ua(e);
    return new common.DocumentSnapshot(e, s, t._key, r, new common.SnapshotMetadata(n.hasPendingWrites, n.fromCache), t.converter);
}

function writeBatch(e) {
    return e = common.ra(e, common.da), common.oa(e), new WriteBatch(e, (t => executeWrite(e, t)));
}

/**
 * @license
 * Copyright 2021 Google LLC
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
 */ function setIndexConfiguration(e, t) {
    e = common.ra(e, common.da);
    const n = common.oa(e);
    if (!n._uninitializedComponentsProvider || "memory" === n._uninitializedComponentsProvider._offline.kind) 
    // PORTING NOTE: We don't return an error if the user has not enabled
    // persistence since `enableIndexeddbPersistence()` can fail on the Web.
    return common.__PRIVATE_logWarn("Cannot enable indexes when persistence is disabled"), Promise.resolve();
    const r = function __PRIVATE_parseIndexes(e) {
        const t = "string" == typeof e ? function __PRIVATE_tryParseJson(e) {
            try {
                return JSON.parse(e);
            } catch (e) {
                throw new common.e(common.ta.INVALID_ARGUMENT, "Failed to parse JSON: " + e?.message);
            }
        }(e) : e, n = [];
        if (Array.isArray(t.indexes)) for (const e of t.indexes) {
            const t = __PRIVATE_tryGetString(e, "collectionGroup"), r = [];
            if (Array.isArray(e.fields)) for (const t of e.fields) {
                const e = __PRIVATE_tryGetString(t, "fieldPath"), n = common.__PRIVATE_fieldPathFromDotSeparatedString("setIndexConfiguration", e);
                "CONTAINS" === t.arrayConfig ? r.push(new common.IndexSegment(n, 2 /* IndexKind.CONTAINS */)) : "ASCENDING" === t.order ? r.push(new common.IndexSegment(n, 0 /* IndexKind.ASCENDING */)) : "DESCENDING" === t.order && r.push(new common.IndexSegment(n, 1 /* IndexKind.DESCENDING */));
            }
            n.push(new common.FieldIndex(common.FieldIndex.UNKNOWN_ID, t, r, common.IndexState.empty()));
        }
        return n;
    }(t);
    return common.__PRIVATE_firestoreClientSetIndexConfiguration(n, r);
}

function __PRIVATE_tryGetString(e, t) {
    if ("string" != typeof e[t]) throw new common.e(common.ta.INVALID_ARGUMENT, "Missing string value for: " + t);
    return e[t];
}

/**
 * @license
 * Copyright 2023 Google LLC
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
 * A `PersistentCacheIndexManager` for configuring persistent cache indexes used
 * for local query execution.
 *
 * To use, call `getPersistentCacheIndexManager()` to get an instance.
 */ class PersistentCacheIndexManager {
    /** @hideconstructor */
    constructor(e) {
        this._firestore = e, 
        /** A type string to uniquely identify instances of this class. */
        this.type = "PersistentCacheIndexManager";
    }
}

/**
 * Returns the PersistentCache Index Manager used by the given `Firestore`
 * object.
 *
 * @returns The `PersistentCacheIndexManager` instance, or `null` if local
 * persistent storage is not in use.
 */ function getPersistentCacheIndexManager(e) {
    e = common.ra(e, common.da);
    const t = De.get(e);
    if (t) return t;
    const n = common.oa(e);
    if ("persistent" !== n._uninitializedComponentsProvider?._offline.kind) return null;
    const r = new PersistentCacheIndexManager(e);
    return De.set(e, r), r;
}

/**
 * Enables the SDK to create persistent cache indexes automatically for local
 * query execution when the SDK believes cache indexes can help improve
 * performance.
 *
 * This feature is disabled by default.
 */ function enablePersistentCacheIndexAutoCreation(e) {
    __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, true);
}

/**
 * Stops creating persistent cache indexes automatically for local query
 * execution. The indexes which have been created by calling
 * `enablePersistentCacheIndexAutoCreation()` still take effect.
 */ function disablePersistentCacheIndexAutoCreation(e) {
    __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, false);
}

/**
 * Removes all persistent cache indexes.
 *
 * Please note this function will also deletes indexes generated by
 * `setIndexConfiguration()`, which is deprecated.
 */ function deleteAllPersistentCacheIndexes(e) {
    const t = common.oa(e._firestore);
    common.__PRIVATE_firestoreClientDeleteAllFieldIndexes(t).then((e => common.__PRIVATE_logDebug("deleting all persistent cache indexes succeeded"))).catch((e => common.__PRIVATE_logWarn("deleting all persistent cache indexes failed", e)));
}

function __PRIVATE_setPersistentCacheIndexAutoCreationEnabled(e, t) {
    const n = common.oa(e._firestore);
    common.__PRIVATE_firestoreClientSetPersistentCacheIndexAutoCreationEnabled(n, t).then((e => common.__PRIVATE_logDebug(`setting persistent cache index auto creation isEnabled=${t} succeeded`))).catch((e => common.__PRIVATE_logWarn(`setting persistent cache index auto creation isEnabled=${t} failed`, e)));
}

/**
 * Maps `Firestore` instances to their corresponding
 * `PersistentCacheIndexManager` instances.
 *
 * Use a `WeakMap` so that the mapping will be automatically dropped when the
 * `Firestore` instance is garbage collected. This emulates a private member
 * as described in https://goo.gle/454yvug.
 */ const De = new WeakMap;

/**
 * @license
 * Copyright 2023 Google LLC
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
 * Testing hooks for use by Firestore's integration test suite to reach into the
 * SDK internals to validate logic and behavior that is not visible from the
 * public API surface.
 *
 * @internal
 */ class TestingHooks {
    constructor() {
        throw new Error("instances of this class should not be created");
    }
    /**
     * Registers a callback to be notified when an existence filter mismatch
     * occurs in the Watch listen stream.
     *
     * The relative order in which callbacks are notified is unspecified; do not
     * rely on any particular ordering. If a given callback is registered multiple
     * times then it will be notified multiple times, once per registration.
     *
     * @param callback - the callback to invoke upon existence filter mismatch.
     *
     * @returns a function that, when called, unregisters the given callback; only
     * the first invocation of the returned function does anything; all subsequent
     * invocations do nothing.
     */    static onExistenceFilterMismatch(e) {
        return __PRIVATE_TestingHooksSpiImpl.instance.onExistenceFilterMismatch(e);
    }
}

/**
 * The implementation of `TestingHooksSpi`.
 */ class __PRIVATE_TestingHooksSpiImpl {
    constructor() {
        this.t = new Map;
    }
    static get instance() {
        return qe || (qe = new __PRIVATE_TestingHooksSpiImpl, common.__PRIVATE_setTestingHooksSpi(qe)), qe;
    }
    Ie(e) {
        this.t.forEach((t => t(e)));
    }
    onExistenceFilterMismatch(e) {
        const t = Symbol(), n = this.t;
        return n.set(t, e), () => n.delete(t);
    }
}

let qe = null;

const Be = "@firebase/firestore", Me = "4.17.1";

/**
 * Cloud Firestore
 *
 * @packageDocumentation
 */
!
/**
 * @license
 * Copyright 2020 Google LLC
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
function __PRIVATE_registerFirestore(s, a = true) {
    common.__PRIVATE_setSDKVersion(app.SDK_VERSION), app._registerComponent(new component.Component("firestore", ((e, {instanceIdentifier: t, options: n}) => {
        const r = e.getProvider("app").getImmediate(), s = new common.da(new common.__PRIVATE_FirebaseAuthCredentialsProvider(e.getProvider("auth-internal")), new common.__PRIVATE_FirebaseAppCheckTokenProvider(r, e.getProvider("app-check-internal")), common.__PRIVATE_databaseIdFromApp(r, t), r);
        return n = {
            useFetchStreams: a,
            ...n
        }, s._setSettings(n), s;
    }), "PUBLIC").setMultipleInstances(true)), app.registerVersion(Be, Me, s), 
    // BUILD_TARGET will be replaced by values like esm, cjs, etc during the compilation
    app.registerVersion(Be, Me, "cjs2020");
}();

exports.AbstractUserDataWriter = common.AbstractUserDataWriter;
exports.Bytes = common.Bytes;
exports.CACHE_SIZE_UNLIMITED = common.yr;
exports.CollectionReference = common.na;
exports.DocumentReference = common.aa;
exports.DocumentSnapshot = common.DocumentSnapshot;
exports.FieldPath = common.FieldPath;
exports.FieldValue = common.FieldValue;
exports.Firestore = common.da;
exports.FirestoreError = common.e;
exports.GeoPoint = common.GeoPoint;
exports.LoadBundleTask = common.LoadBundleTask;
exports.Query = common.Query;
exports.QueryDocumentSnapshot = common.QueryDocumentSnapshot;
exports.QuerySnapshot = common.QuerySnapshot;
exports.SnapshotMetadata = common.SnapshotMetadata;
exports.Timestamp = common.Timestamp;
exports.VectorValue = common.n;
exports._AutoId = common.__PRIVATE_AutoId;
exports._ByteString = common.ByteString;
exports._DatabaseId = common.DatabaseId;
exports._DocumentKey = common.DocumentKey;
exports._EmptyAppCheckTokenProvider = common.__PRIVATE_EmptyAppCheckTokenProvider;
exports._EmptyAuthCredentialsProvider = common.__PRIVATE_EmptyAuthCredentialsProvider;
exports._FieldPath = common.Oe;
exports._cast = common.ra;
exports._debugAssert = common.__PRIVATE_debugAssert;
exports._internalAggregationQueryToProtoRunAggregationQueryRequest = common._internalAggregationQueryToProtoRunAggregationQueryRequest;
exports._internalQueryToProtoQueryTarget = common._internalQueryToProtoQueryTarget;
exports._isBase64Available = common.__PRIVATE_isBase64Available;
exports._logWarn = common.__PRIVATE_logWarn;
exports._validateIsNotUsedTogether = common.__PRIVATE_validateIsNotUsedTogether;
exports.arrayRemove = common.arrayRemove;
exports.arrayUnion = common.arrayUnion;
exports.clearIndexedDbPersistence = common.clearIndexedDbPersistence;
exports.collection = common.collection;
exports.collectionGroup = common.collectionGroup;
exports.connectFirestoreEmulator = common.connectFirestoreEmulator;
exports.deleteField = common.deleteField;
exports.disableNetwork = common.disableNetwork;
exports.doc = common.doc;
exports.documentId = common.documentId$1;
exports.documentSnapshotFromJSON = common.documentSnapshotFromJSON;
exports.enableIndexedDbPersistence = common.enableIndexedDbPersistence;
exports.enableMultiTabIndexedDbPersistence = common.enableMultiTabIndexedDbPersistence;
exports.enableNetwork = common.enableNetwork;
exports.ensureFirestoreConfigured = common.oa;
exports.getFirestore = common.getFirestore;
exports.increment = common.increment;
exports.initializeFirestore = common.initializeFirestore;
exports.loadBundle = common.loadBundle;
exports.maximum = common.maximum$1;
exports.minimum = common.minimum$1;
exports.namedQuery = common.namedQuery;
exports.queryEqual = common.queryEqual;
exports.querySnapshotFromJSON = common.querySnapshotFromJSON;
exports.refEqual = common.H;
exports.serverTimestamp = common.serverTimestamp;
exports.setLogLevel = common.setLogLevel;
exports.snapshotEqual = common.snapshotEqual;
exports.terminate = common.terminate;
exports.vector = common.r;
exports.waitForPendingWrites = common.waitForPendingWrites;
exports.AggregateField = AggregateField;
exports.AggregateQuerySnapshot = AggregateQuerySnapshot;
exports.PersistentCacheIndexManager = PersistentCacheIndexManager;
exports.QueryCompositeFilterConstraint = QueryCompositeFilterConstraint;
exports.QueryConstraint = QueryConstraint;
exports.QueryEndAtConstraint = QueryEndAtConstraint;
exports.QueryFieldFilterConstraint = QueryFieldFilterConstraint;
exports.QueryLimitConstraint = QueryLimitConstraint;
exports.QueryOrderByConstraint = QueryOrderByConstraint;
exports.QueryStartAtConstraint = QueryStartAtConstraint;
exports.Transaction = Transaction;
exports.WriteBatch = WriteBatch;
exports._TestingHooks = TestingHooks;
exports.addDoc = addDoc;
exports.aggregateFieldEqual = aggregateFieldEqual;
exports.aggregateQuerySnapshotEqual = aggregateQuerySnapshotEqual;
exports.and = and;
exports.average = average;
exports.count = count;
exports.deleteAllPersistentCacheIndexes = deleteAllPersistentCacheIndexes;
exports.deleteDoc = deleteDoc;
exports.disablePersistentCacheIndexAutoCreation = disablePersistentCacheIndexAutoCreation;
exports.enablePersistentCacheIndexAutoCreation = enablePersistentCacheIndexAutoCreation;
exports.endAt = endAt;
exports.endBefore = endBefore;
exports.executeWrite = executeWrite;
exports.getAggregateFromServer = getAggregateFromServer;
exports.getCountFromServer = getCountFromServer;
exports.getDoc = getDoc;
exports.getDocFromCache = getDocFromCache;
exports.getDocFromServer = getDocFromServer;
exports.getDocs = getDocs;
exports.getDocsFromCache = getDocsFromCache;
exports.getDocsFromServer = getDocsFromServer;
exports.getPersistentCacheIndexManager = getPersistentCacheIndexManager;
exports.limit = limit;
exports.limitToLast = limitToLast;
exports.memoryEagerGarbageCollector = memoryEagerGarbageCollector;
exports.memoryLocalCache = memoryLocalCache;
exports.memoryLruGarbageCollector = memoryLruGarbageCollector;
exports.onSnapshot = onSnapshot;
exports.onSnapshotResume = onSnapshotResume;
exports.onSnapshotsInSync = onSnapshotsInSync;
exports.or = or;
exports.orderBy = orderBy;
exports.persistentLocalCache = persistentLocalCache;
exports.persistentMultipleTabManager = persistentMultipleTabManager;
exports.persistentSingleTabManager = persistentSingleTabManager;
exports.query = query;
exports.runTransaction = runTransaction;
exports.setDoc = setDoc;
exports.setIndexConfiguration = setIndexConfiguration;
exports.startAfter = startAfter;
exports.startAt = startAt;
exports.sum = sum;
exports.updateDoc = updateDoc;
exports.where = where;
exports.writeBatch = writeBatch;
//# sourceMappingURL=index.cjs.js.map
