package models

import (
	"fmt"
	"log"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const (
	USER   = "admin"
	PASS   = "mbf190377"
	HOST   = "127.0.0.1"
	PORT   = "3306"
	DBNAME = "mydb"
)

func Connect() *gorm.DB {
	URL := fmt.Sprintf("%s:%s@tcp(%s:%d);/%s?charset=utf8&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DBNAME)
	db, err := gorm.Open("mysql", URL)
	if err != nil {
		log.Fatal(err)
		return nil
	}
	return db

}
