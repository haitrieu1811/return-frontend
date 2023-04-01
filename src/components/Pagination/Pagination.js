import { Pagination } from 'antd';

const CompPagination = ({ onChange, total, pageSize }) => {
    return <Pagination defaultCurrent={1} total={total} pageSize={pageSize} onChange={onChange} />;
};

export default CompPagination;
