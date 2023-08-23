const config = require(`${__config_dir}/app.config.json`);
const {debug} = config;
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi =  require('joi');

class _todo{
    add(data, usersLog){
        // Validate data
        const schema = Joi.object({
            userId: Joi.number(),
            description: Joi.string()
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
        console.log(usersLog)
        // Insert data to database
        const sql = {
            query: `INSERT INTO todo (description, userId) VALUES (?, ${usersLog.data[0].id})`,
            params: [data.description]
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
                    console.error('add todo Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    updated(data){
        const schema = Joi.object({
            id: Joi.number(),
            description: Joi.string()
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
            query: `UPDATE todo SET description = ? where id = ?`,
            params: [data.description, data.id]
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
                    console.error('updated todo Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    getAll(data){
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
            query: `SELECT * FROM todo`,            
        }
        return mysql.query(sql.query)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get list todo Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    getbyUser(data, usersLog){
        const schema = Joi.object({
            userId: Joi.number()
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
            query: `SELECT * FROM todo where userId = ${usersLog.data[0].id}`,        
        }
        return mysql.query(sql.query)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get list todo by user Error: ', error)
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
            query: `DELETE FROM todo where id = ?`,
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
                    console.error('deleted todo Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
}

module.exports = new _todo();
