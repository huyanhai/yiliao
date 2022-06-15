import { ref } from 'vue';

export const columns = ref([
  {
    align: 'center',
    width: '200',
    colKey: 'index',
    title: '医院名称',
  },
  {
    width: '200',
    colKey: 'platform',
    title: '医院头像',
  },
  {
    width: '100',
    colKey: 'platform',
    title: '上级医院',
  },
  {
    width: '200',
    colKey: 'platform',
    title: '医院地址',
  },
  {
    width: '100',
    colKey: 'platform',
    title: '医院类型',
  },
  {
    width: '100',
    colKey: 'platform',
    title: '医院等级',
  },
  {
    width: '100',
    colKey: 'platform',
    title: '是否上架',
  },
  {
    width: 220,
    title: '操作',
    cell: 'operation',
    fixed: 'right',
  },
]);
