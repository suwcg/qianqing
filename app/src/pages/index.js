import 'antd/dist/antd.css';
import styles from './index.css';
import {Link} from "umi";
import {useAsyncFn} from 'react-use';
import fly from "flyio";
import {Button} from 'antd';
import React from 'react';


export default function () {
    const [state, fetch] = useAsyncFn(async () => {
        await fly.post(
            '/jsonrpc/', {
                "jsonrpc": "2.0",
                "method": "Counter.Incr",
                "params": {
                    "delta": 1
                },
                "id": 1
            })
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Get",
            "params": {},
            "id": 1
        });
        return response.data.result.Count
    },);

    return (
        <div>
            <div className={styles.welcome}/>
            <Link to="/a" className={styles.text}>Users Page</Link>
            <div>
                <div className={styles.text}>点击次数: {state.value}</div>
                <Button type="primary" onClick={fetch}>Add One</Button>
            </div>
        </div>
    );
}
