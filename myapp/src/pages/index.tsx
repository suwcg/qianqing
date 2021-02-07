import React from 'react';
import styles from './index.less';
//import
import {Link} from 'umi';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to = './user'>To User Page</Link>
    </div>
  );
}
