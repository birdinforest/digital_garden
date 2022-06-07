/**
 * A component to print log.
 * @param prop
 * @example
 * ```
 * const obj = {name: 'Jhon', age: 30}
 * <div>
 *    <p>imagine this is some component</p>
 *    <Console log='foo' />
 *    <p>imagine another component</p>
 *    <Console warn='bar' />
 *    <p>obj</p>
 *    <Console log={obj} />
 * </div>
 * ```
 */
export default (prop: { [s: string]: unknown; } | ArrayLike<unknown>) => (
// @ts-ignore
  console[Object.keys(prop)[0]](...Object.values(prop))
    ,null // ➜ React components must return something
)
