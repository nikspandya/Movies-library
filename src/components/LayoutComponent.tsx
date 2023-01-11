import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

export const LayoutComponent = ({
  children,
}: Record<string, JSX.Element>): JSX.Element => {
  return (
    <Layout>
      <Content>
        <div className='body'>{children}</div>
      </Content>
    </Layout>
  );
};