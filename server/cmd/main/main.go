package main

import (
	"errors"
	"flag"
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"log"
	"net/http"
)

type Counter struct {
	Count int
}

type IncrReq struct {
	Delta int
}

type ComReq struct {
	Data int
}

// Notification.
func (c *Counter) Incr(r *http.Request, req *IncrReq, res *json2.EmptyResponse) error {
	log.Printf("<- Incr %+v", *req)
	c.Count += req.Delta
	return nil
}

func (c *Counter) Add(r *http.Request, req *ComReq, res *Counter) error {
	c.Count += req.Data
	*res = *c
	log.Printf("Add: %d, Now: %d", *req, *c)
	return nil
}

func (c *Counter) Dec(r *http.Request, req *ComReq, res *Counter) error {
	c.Count -= req.Data
	*res = *c
	log.Printf("Dec: %d, Now: %d", *req, *c)
	return nil
}

func (c *Counter) Multi(r *http.Request, req *ComReq, res *Counter) error {
	c.Count *= req.Data
	*res = *c
	log.Printf("Multi: %d, Now: %d", *req, *c)
	return nil
}

func (c *Counter) Div(r *http.Request, req *ComReq, res *Counter) error {
	if req.Data == 0 {
		log.Printf("除数为0,发生错误！")
		return errors.New("除数不能为0")
	}
	c.Count /= req.Data
	*res = *c
	log.Printf("Div: %d, Now: %d", *req, *c)
	return nil
}

type GetReq struct {
}

func (c *Counter) reset(r *http.Request, req *GetReq, res *Counter) error {
	c.Count = 0
	*res = *c
	log.Printf("reset !!!!!!")
	return nil
}

func (c *Counter) Get(r *http.Request, req *GetReq, res *Counter) error {
	*res = *c
	log.Printf("Now: %v", *res)
	return nil
}

func main() {
	address := flag.String("address", ":65534", "")
	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	s.RegisterService(new(Counter), "")
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	http.Handle("/jsonrpc/", s)
	log.Fatal(http.ListenAndServe(*address, nil))
}
