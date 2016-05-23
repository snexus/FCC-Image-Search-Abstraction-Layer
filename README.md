# FCC url shortener microservice


## Quick Start Guide

Visit urlshortms.herokuapp.com

## User stories fullfiled
    1) I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
    2) When I visit that shortened URL, it will redirect me to my original link 


##Example Usage
`http://urlshortms.herokuapp.com/new/http://foo.com:80`

##Example output
'{"shortUrl":"njftsjf","longUrl":"http://foo.com:80"}'

##Example restoring long url
`http://urlshortms.herokuapp.com/hgvyfdx` - will redirect to www.google.com

