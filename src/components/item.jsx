export default {
  name: 'item',

  props: {
    title: String
  },

  render () {
    const { title, $slots } = this

    return <li>
      <a href="javascript:void(0);">
        {
          $slots.title || <span>
            {title}
          </span>
        }
        {$slots.default}
      </a>
    </li>
  }
}
