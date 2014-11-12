var configs = {
    host: '',
    port: 8080,
    ssl: false,
    imagesDir : 'uploads/userImages',
    db: {
        dbname: 'picndoc',
        dbhost: 'localhost',
        dbport: '27017',
        collections: {
            users: 'users',
            images: 'images'
        }
    }
    
    
    
    
    
}
module.exports = configs;