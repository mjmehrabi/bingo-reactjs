export function addMarkedNumber(number: number) {
    return {
        type: 'SET_MARKED',
        number: number
    }
}