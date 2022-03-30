export type ConditionOperators = {
    '=': 'equal to'
    '!=': 'not equal to'
    '>': 'greater than'
    '<': 'less than'
    '>=': 'greater than or equal to'
    '<=': 'less than or equal to'
    'reg': 'matches pattern'
}

export type ActionOperators = {
    'value': 'to value'
    'value-of': 'to value of'
}

export type OperatorData<O, K = keyof O> = {
    description: O[K]
    operator: K
}
