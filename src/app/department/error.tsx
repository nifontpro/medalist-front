'use client';

import ServerError from '@/ui/ErrorPages/ServerError/ServerError';

const ErrorWrapperDepartment = ({ error }: { error: Error }) => {
  return <ServerError error={error.message} />;
};

export default ErrorWrapperDepartment;
