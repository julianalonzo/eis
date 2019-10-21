import React from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core';

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <MuiBreadcrumbs>
      {breadcrumbs.map(breadcrumb => {
        return (
          <Link key={breadcrumb.link} to={breadcrumb.link}>
            {breadcrumb.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
