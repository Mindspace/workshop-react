import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

/**
 * This function handles all the complexities of concatenate classNames for Tailwind and using object specifiers
 * @see https://www.youtube.com/watch?v=re2JFITR7TI
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

// ********************************************************
// For class-based UI components with React Router component tree,
// use these utils to get access to the router props.
// ********************************************************

export type RouterProps<TParams = Record<string, string>> = TParams & {
  router: {
    location: ReturnType<typeof useLocation>;
    navigate: ReturnType<typeof useNavigate>;
    params: TParams; // ReturnType<typeof useParams>;
  };
};

export function withRouter<ComponentProps>(
  Target: React.FunctionComponent<ComponentProps> | React.ComponentClass<ComponentProps>,
) {
  function ComponentWithRouterProp(props: ComponentProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Target {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
