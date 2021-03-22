import React, { Component } from 'react'

export default class Work extends Component {
    constructor() {
        super()
        this.state = {
            FoodList: [
                {
                    id: 1,
                    name: '苹果',
                    time: new Date()
                },
                {
                    id: 2,
                    name: '西瓜',
                    time: new Date()
                },
                {
                    id: 3,
                    name: '菠萝',
                    time: new Date()
                },

            ],
            info: {},  //编辑
        }
    }
    // 提交事件  传递一个参数event
    sub(e) {
        // console.log(e);
        // 进行判断 回车键
        if (e.keyCode === 13) {
            let name = e.target.value;
            if (name === '') {
                alert('请输入水果名称')
                return
            }
            // 判断 中间件是否有值
            if (this.state.info.id) {
                // 修改
                this.update(this.state.info, name)
            } else {
                this.add(name)
            }
            // 回车后清空输入框
            e.target.value = ''
        }
    }

    // 添加水果
    add(name) {
        const { FoodList } = this.state
        // console.log(this.state);
        let id = FoodList.length > 0 ? FoodList[FoodList.length - 1].id + 1 : 1;
        let time = new Date();
        let params = {
            id,
            name,
            time
        }
        FoodList.push(params); // 在尾部添加
        this.setState({ FoodList })  // 异步函数。修改state状态数据
    }

    // 编辑水果
    edit(row) {
        // console.log(row);
        console.log(this);
        document.querySelector('input').value = row.name;
        this.setState({ info: row }) //数据存储
    }

    // 修改 改名字传name
    update(row, name) {
        const { FoodList } = this.state;
        // 遍历foodlist 的每一项
        const newList = FoodList.map(item => {
            if (item.id === row.id) {
                return {
                    ...item,//匹配不做改变的项
                    name: name
                }
            } else {
                return item
            }
        })
        //  修改数据
        this.setState({ FoodList: newList })
        // 清空
        this.setState({ info: {} })
    }

    // 删除
    del(index) {
        console.log(index);
        this.state.FoodList.splice(index, 1);
        this.setState({ FoodList: this.state.FoodList })

    }



    render() {
        const { FoodList } = this.state
        return (
            <div className="container">
                <h2>水果管理react练习</h2>
                {/* 点击键盘事件的时候提交 */}
                <input type="text" className="form-control" placeholder='请输入水果名称' onKeyUp={(e) => this.sub(e)} />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>名称</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FoodList.length > 0 ? FoodList.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.time.toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => this.edit(item)}>编辑</button>
                                    <button className="btn btn-danger" onClick={() => this.del(index)}>删除</button>
                                </td>
                            </tr>
                        )) :
                            <tr>
                                <td colSpan='4'>暂无数据</td>
                            </tr>
                        }

                    </tbody>


                </table>

            </div>
        )
    }
}
