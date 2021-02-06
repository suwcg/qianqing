import styles from './index.less';
import {Button} from 'antd';
import {useAsyncFn} from 'react-use';
import React from 'react';
import fly from "flyio";

var f=0;

export default function IndexPage() {
  if(f==0){
    fly.post('/jsonrpc/', {
        "jsonrpc":"2.0","method":"Counter.Clear","params": {"delta":1},"id":2
      });
  }
  const [state, fetch] = useAsyncFn(async () => {
      fly.post('/jsonrpc/', {
          "jsonrpc":"2.0","method":"Counter.Incr","params": {"delta":1},"id":2
        });
      let resp= await fly.post('/jsonrpc/', {
          "jsonrpc":"2.0","method":"Counter.Get","params": {},"id":2
        });
        f=1;
       return resp.data;
    },);


    function fetch1(){
         window.location.reload();
    }

   function word(){
     if(f==1){
       return JSON.stringify(state.value.result.Count);
     }else{
       return "0";
     }
   }
  return (
    <div>
      <Button type="primary" onClick={fetch}>Add</Button>
      <Button type="primary" onClick={fetch1}>Clear</Button>
      <h1>{word()}</h1>
    </div>
  );
}
