const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi =  require('joi');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const hash =  require('../class/hash.class')

class _users{
    async register(data){
        const schema = await Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = await schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        const encryptPass = hash.sha256(data.password)
        const sql = {
            query: `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            params: [data.name, data.email, encryptPass]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add users Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    async login(formData) {
        // Validate data
       const schema = Joi.object({  
            id: Joi.number(),
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
       }).options({
           abortEarly: false
       })
       const validation = schema.validate(formData)
       if(validation.error){
           const errorDetails = validation.error.details.map((detail)=>{
               detail.message
           })

           return {
               status: false,
               code: 422,
               error: errorDetails.join(', ')
           }
       }
       
       // Insert data to database
       const sql = {
           query: `SELECT * from users where email = ?`,
           params: [formData.email]
       }
       
       return mysql.query(sql.query, sql.params)
            .then(data=>{
                if (data.length === 0) {
                    return {
                        status: false,
                        code: 404,
                        error: 'User not found'
                    };
                }   
                const {name, email, password} = data[0]
                const hashPassword = hash.sha256(formData.password)                
                const token = jwt.sign({data}, 'secret', { expiresIn: 60 * 60 })
               if(hashPassword === password) return {
                   status: true,
                   data: {
                    token: token
                   }
               }
               return {
                   status: false
               }
           })
           .catch(error =>{
               if (debug){
                   console.error('add task Error: ', error)
               }

               return{
                   status: false,
                   error
               }
        })
    }          
    getUser(data){
        const schema = Joi.object({
            id: Joi.number()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        const sql = {
            query: `SELECT * FROM users`,
            params: [data.id]
        }
        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get list users Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    getByIdUser(data){
        const schema = Joi.object({
            id: Joi.number()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        const sql = {
            query: `SELECT * FROM users where id = ?`,
            params: [data.id]
        }
        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get list by id users Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    deleted(data){
        const schema = Joi.object({
            id: Joi.number()            
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        const sql = {
            query: `DELETE FROM users where id = ?`,
            params: [data.id]
        }
        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('deleted users Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
}
module.exports = new _users();