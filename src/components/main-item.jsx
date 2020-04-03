import Item from './item'
import { Modal } from 'ant-design-vue'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          type: '',
          name: '',
          sub_button: []
        }
      }
    },
    index: Number
  },

  data () {
    return {
      subIndex: null
    }
  },

  computed: {
    subCount () {
      return Object.prototype.hasOwnProperty.call(this.data, 'sub_button') ? this.data.sub_button.length : 0
    },

    current () {
      const { $parent, index } = this

      return $parent.mainActive === index ? 'current' : ''
    }
  },

  methods: {
    // 添加子菜单并默认选中
    async handleAddSubMenu (e) {
      e.preventDefault()
      e.stopPropagation()

      const defaultSub = {
        name: '子菜单名称'
      }

      const confirm = () => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: '温馨提示',
            content: '删除后“菜单名称”菜单下设置的内容将被删除',
            okText: '确定',
            cancelText: '取消',
            okCancel: true,
            onOk: () => {
              this.$set(this.$parent.value, this.index, {
                name: this.data.name,
                sub_button: []
              })
              resolve(true)
            },
            onCancel: () => {
              reject(new Error())
            }
          })
        })
      }

      if (Object.keys(this.data).length > 2) {
        try {
          await confirm()
        } catch (error) {
          return false
        }
      }

      this.data.sub_button.push(defaultSub)
      this.subIndex = this.data.sub_button.length - 1
      this.handleSelectSub(e, this.subIndex)
    },
    // 选中主菜单
    handleSelectMain (e) {
      e.preventDefault()
      e.stopPropagation()

      const { $parent, index } = this
      $parent.mainActive = index
      $parent.mainSubActive = index
      this.clearSubIndex()

      const select = Object.assign({
        level: 1,
        parent: 0,
        index
      }, this.data)

      $parent.handleTargetObject(select)
    },
    // 选中子菜单
    handleSelectSub (e, subIndex) {
      e.preventDefault()
      e.stopPropagation()

      this.subIndex = subIndex
      this.clearMainActive()

      const select = Object.assign({
        level: 2,
        parent: this.index,
        index: subIndex
      }, this.data.sub_button[subIndex])
      this.$parent.handleTargetObject(select)
    },
    // 清空主菜单选中
    clearMainActive () {
      const { $parent } = this

      $parent.mainActive = null
    },
    // 清空子菜单选中
    clearSubIndex () {
      this.subIndex = null
    }
  },

  render () {
    const { data, $parent, subCount, index, subIndex, current } = this

    return <Item class={current} nativeOnClick={this.handleSelectMain}>
      <template slot="title">
        { data.sub_button.length ? <i class='menu_dot'></i> : '' }
        <span>
          { data.name }
        </span>
      </template>
      { $parent.mainSubActive === index && <div class="sub-menu">
        <ul>
          { Object.prototype.hasOwnProperty.call(data, 'sub_button') && data.sub_button.map((item, index) => <Item class={subIndex === index ? 'current' : ''} nativeOnClick={e => this.handleSelectSub(e, index)}>
            <span slot="title" class='menu_inner'>
              <span> { item.name } </span>
            </span>
          </Item>) }
          { subCount < $parent.subCount && <li onClick={this.handleAddSubMenu}>
            <a href="javascript:void(0);">
              <span class='menu_inner'>
                <span><i class="plus"></i></span>
              </span>
            </a>
          </li> }
        </ul>
      </div> }
    </Item>
  }
}
