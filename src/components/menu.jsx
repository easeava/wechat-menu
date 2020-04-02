import Vue from 'vue'
import MainItem from './main-item'
import { FormModel, Input, Modal, Button } from 'ant-design-vue'
import style from './style.module.scss'

Vue.use(FormModel)
Vue.use(Input)
Vue.use(Button)

export const MenuProps = {
  value: {
    type: Array,
    default () {
      return []
    }
  }
}

const Menu = {
  props: MenuProps,

  computed: {
    valueCount () {
      return this.value.length
    }
  },

  data () {
    return {
      mainCount: 3, // 主菜单限制
      subCount: 5, // 子菜单限制
      mainActive: null, // 主菜单选中
      mainSubActive: null, // 子菜单显示状态
      tmp: {}, // 临时选中对象
      form: {} // 临时选中对象浅Copy
    }
  },

  methods: {
    // 添加主菜单
    handleAddMenu (e) {
      e.preventDefault()
      const defaultMain = {
        name: '菜单名称',
        sub_button: []
      }

      this.value.push(defaultMain)
      const index = this.value.length - 1
      this.mainActive = index
      this.mainSubActive = index

      this.handleTargetObject(this.value[index], index)
    },
    // 当前选中对象
    handleTargetObject (item) {
      this.tmp = item
      this.form = Object.assign({}, item)
    },
    // 删除当前菜单
    handleDelete () {
      Modal.warning({
        title: '温馨提示',
        content: '删除后“菜单名称”菜单下设置的内容将被删除',
        okText: '确定',
        cancelText: '取消',
        okCancel: true,
        onOk: () => {
          const { tmp, value } = this

          if (tmp.level === 2) {
            value[tmp.parent].sub_button.splice(tmp.index, 1)
          } else {
            value.splice(tmp.index, 1)
          }

          this.tmp = {}
          this.form = {}
        }
      })
    }
  },

  render () {
    const { value, mainCount, valueCount } = this

    const renderPreview = () => {
      return <div class={style.previewBox}>
        <div class={style.head}></div>
        <div class={style.previewMenu}>
          <ul class='menu-list'>
            { value.map((item, index) => <MainItem data={item} index={index} />) }

            { valueCount < mainCount && <li onClick={this.handleAddMenu}>
              <a href="javascript:void(0);">
                <span>
                  <i class="plus"></i>
                </span>
              </a>
            </li> }
          </ul>
        </div>
      </div>
    }

    const renderFormContent = () => {
      const { tmp, form } = this

      return <div class={style.formBox}>
        <div class={style.formHeader}>
          <h4 class='global-info'>{tmp.name}</h4>
          <div className="global-extra">
            <a href="javascript:void(0);" onClick={this.handleDelete}>删除菜单</a>
          </div>
        </div>

        <div class={style.formBody}>
          <a-form-model class={style.formModel} vModel={form}>
            <a-form-model-item label="菜单名称">
              <a-input vModel_trim={form.name} />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    }

    const renderForm = () => {
      const { tmp } = this
      return <div class={style.form}>
        <div class={style.formMain}>
          { Object.keys(tmp).length ? renderFormContent() : <div class={style.none}>点击左侧菜单进行编辑操作</div> }
        </div>
      </div>
    }

    const renderFooter = () => {
      return <div class={style.mainFooter}>
        <a-button type="primary" ghost class={style.submitForm}>保存并发布</a-button>
      </div>
    }

    return <div class={style.main}>
      <div class={style.mainHeader}>
        {renderPreview()}
        {renderForm()}
      </div>
      { Object.keys(this.tmp).length ? renderFooter() : ''}
    </div>
  }
}

export default Menu
