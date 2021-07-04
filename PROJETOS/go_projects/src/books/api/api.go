package api

import (
	"books/api/models"
	"books/api/routes"
	"fmt"
	"log"
	"net/http"
)

func Run() {
	db := Connect()
	defer db.Close()
	if !db.hasTable(&models.Book{}) {
		db.Debug().CreateTable(&models.Book)
	}
	listen(3000)
}

func listen(p int) {
	port := fmt.Sprintf(":%d", p)
	fmt.Printf("\n\nListening port %s...\n", port)
	r := routes.NewRouter()
	log.Fatal(http.ListenAndServe(port, r))

}
