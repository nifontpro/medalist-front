'use client';

import ServerError from '@/ui/ErrorPages/ServerError/ServerError';

const ErrorWrapperDepartmentId = ({ error }: { error: Error }) => {
  return <ServerError error={error.message} />;
};

export default ErrorWrapperDepartmentId;
