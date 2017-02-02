var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODIyMmU5Y2E3MmJkYTAwMTJjNjkwY2IiLCJ1c2VybmFtZSI6InBhdmJveGRldkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTQ3ODYzNTE2Nn0.CO-mxvW67JU2Nhx4x6PjG5-_bx61GjFjMPoC7nlvCoE';
var skb = new Skb(token);

skb.taskHelloWorld('Привет, друзья)');
