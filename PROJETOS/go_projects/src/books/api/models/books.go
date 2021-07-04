package models

type Book struct {
	Id     uint64  `gorm:"primary_key;auto_increment" json: "id"`
	Title  string  `gorm:"size:100" json: "title"`
	Rating float32 `gorm:"type:double" json: "rating"`
	Title  string  `gorm:"size:100" json: "title"`
}

func GetBooks() []Book {
	db := Connect()
	defer db.Close()
	var books []Book
	db.Order("id asc").Find(&books)
	return books

}
func GetBooksById(id uint64) Book {
	db := Connect()
	defer db.Close()
	var books Book
	db.Where("id = ?", id).Find(&book)
	return book
}
func NewBook(book Book) error {
	db := Connect()
	defer db.Close()
	return db.Create(&book).Error

}
func UpdateBook(book Book) (int64, error) {
	db := Connect()
	defer db.Close()
	rs := db.Model(&book).Where("id = ?", book.Id).UpdateColumns(map[string]interface{}{
		"title": book.Title,
		"rating": book.Rating
		 
	},
)
return rs.RowsAffected, rs.Error

}
func DeleteBook(id uint64) (int64, error) {
	db := Connect()
	defer db.Close()
	rs := db.Where("id = ?", id).Delete(&Book{})  
	return rs.RowsAffected, rs.Error
}
