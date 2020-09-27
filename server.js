const path = require('path');
const express = require('express');
const fs = require('fs');
const event = require('events');
const http = require('http');
const socket = require('socket.io');
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socket(server);
const {exec} = require('child_process');
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('User Connected');
    socket.on('execute_code', (msg,callback)=>{
        if(msg.language=='JavaScript'){
            fs.writeFile(`public/execute.js`, msg.code, (err)=>{
                exec(`js public/execute.js`, (err, stdout, stderr)=>{
                    if(err){
                        io.emit('code_output', err);
                    }
                    else{
                        io.emit('code_output', stdout);
                        callback('Message from server');
                    }
                })
            })
        }else if(msg.language=='C')
        {
            fs.writeFile(`public/execute.c`, msg.code, (err)=>{
                exec(`gcc public/execute.c -o public/c`, (err, stdout, stderr)=>{
                    if(err){
                        io.emit('code_output', err);
                    }
                    else{
                        exec(`./c`, (err, stdout, stderr)=>{
                            if(err){
                                io.emit('code_output', err);
                            }else{
                                io.emit('code_output', stdout);
                            }
                        })
                        
                    }
                })
            })
        }
        else if(msg.language=='C++'){
            fs.writeFile(`public/execute.cpp`, msg.code, (err)=>{
                exec(`g++ public/execute.cpp -o public/cpp`, (err, stdout, stderr)=>{
                    if(err){
                        io.emit('code_output', err);
                    }
                    else{
                        exec(`./cpp`, (err, stdout, stderr)=>{
                            if(err){
                                io.emit('code_output', err);
                            }else{
                                io.emit('code_output', stdout);
                            }
                        })
                    }
                })
            })
        }
        else if(msg.language=='python'){
            fs.writeFile(`public/execute.py`, msg.code, (err)=>{
                exec(`python3 public/execute.py`, (err, stdout, stderr)=>{
                    if(err){
                        io.emit('code_output', err);
                    }
                    else{
                        io.emit('code_output', stdout);
                        
                    }
                })
            })
        }
        else if(msg.language=='PHP'){
            fs.writeFile(`public/execute.php`, msg.code, (err)=>{
                exec(`php public/execute.php`, (err, stdout, stderr)=>{
                    if(err){
                        io.emit('code_output', err);
                    }
                    else{
                        io.emit('code_output', stdout);
                        
                    }
                })
            })
        }
        callback('Message from server');
    });
})
server.listen(port, (err)=>{
    console.log('Server is started');
})