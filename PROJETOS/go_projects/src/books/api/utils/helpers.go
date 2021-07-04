package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func BodyParse(r *http.Request) []byte {
	body, _ := ioutil.ReadAll(r.Body)
	return body
}
func CheckError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
func TOJson(w http.ResponseWriter, data interface{}, statusCode int) {
	w.Header("Content-type", "applicatin/json; charset=UTF8")
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	CheckError(err)
}
