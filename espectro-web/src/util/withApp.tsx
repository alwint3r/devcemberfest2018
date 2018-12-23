import React from 'react';
import App from '../components/App';

export default function withApp(WrappedComponent: any) {
  return function AppWrapped(props: any) {
    return (
      <App>
        <WrappedComponent {...props} />
      </App>
    )
  }
}