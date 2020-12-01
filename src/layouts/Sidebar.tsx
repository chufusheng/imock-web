import * as React from 'react';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';



interface SidebarState {
    collapsed: boolean;
    mode: "vertical" | "inline" | "horizontal" | undefined;
}


class Sidebar extends React.Component<unknown, SidebarState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            collapsed: false,
            mode: "inline",
        };
    }


    public render(): JSX.Element {
        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
                <div className="ant-layout-logo" >
                    {/* <img className="logo-img" src={aaa} />  */}
                    {/* <div className='text-logo'>troublemaker</div> */}
                </div>
                <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to="/home">
                            <Icons.UserOutlined />
                            <span className="nav-text">用户</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/config">
                            <Icons.SnippetsOutlined />
                            <span className="nav-text">配置</span>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="3">
                        <Link to="/todo">
                            <Icons.SnippetsOutlined />
                            <span className="nav-text">配置2</span>
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="4">
                        <Link to="/about">
                            <Icons.FileOutlined />
                            <span className="nav-text">关于</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        );
    }



    private toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? "vertical" : "inline",
        });
    }
}

export default Sidebar;
