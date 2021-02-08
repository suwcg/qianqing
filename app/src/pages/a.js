import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {Button, InputNumber} from 'antd';
import {useAsyncFn} from "react-use";
import fly from "flyio";


export default function () {
    let [res, setNum] = useState(1);
    let [vis, setVis] = useState(0);
    let [stateAdd, fetchAdd] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Add",
            "params": {"Data": res},
            "id": 1
        });
        setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    let [stateDec, fetchDec] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Dec",
            "params": {"Data": res},
            "id": 1
        });
        setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    let [stateMulti, fetchMulti] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Multi",
            "params": {"Data": res},
            "id": 1
        });setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    let [stateDiv, fetchDiv] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Div",
            "params": {"Data": res},
            "id": 1
        });
        setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    let [stateReset, fetchReset] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Reset",
            "params": {},
            "id": 1
        });
        setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    let [stateGet, fetchGet] = useAsyncFn(async () => {
        let response = await fly.post('/jsonrpc/', {
            "jsonrpc": "2.0",
            "method": "Counter.Get",
            "params": {},
            "id": 1
        });
        setVis(response.data.result.Count)
        return response.data.result.Count
    },);

    return (
        <div align={"left"}>
            <div>
                Result:{vis}
            </div>
            <div >
                <InputNumber value={res} onChange={setNum}>a</InputNumber>
            </div>
            <div>
                <Button type={"primary"} onClick={fetchAdd}>+</Button>
                <Button type={"primary"} onClick={fetchDec}>-</Button>
                <Button type={"primary"} onClick={fetchMulti}>*</Button>
                <Button type={"primary"} onClick={fetchDiv}>/</Button>
            </div>
            <div>
                <Button type={"primary"} onClick={fetchReset}>清零</Button>
                <Button type={"primary"} onClick={fetchGet}>=</Button>
            </div>
        </div>
    )
}



