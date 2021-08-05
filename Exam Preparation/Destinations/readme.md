Collection of destinations for the problem.
Used postman to post a request to local server provided from softuni in order to have data for older exams. It's not fancy but it did the job.

In Postman:
 Provide accessToken for authorization('X-Authorization' : token) and the send post request with body- JSON object:
 ```javascript
     {
        "name": "Canada",
        "city": "Toronto",
        "duration": 20,
        "departure": "2020-03-10",
        "image": "https://mediaim.expedia.com/destination/7/3224f0c851f315db5f5d3d377f63a537.jpg?impolicy=fcrop&w=800&h=533&q=high"
    }
```

After that get request returns:

```javascript
[
    {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "name": "Germany",
        "city": "Berlin",
        "duration": 13,
        "departure": "2021-11-15",
        "image": "https://static.dw.com/image/43901161_303.jpg",
        "_createdOn": 1628152332802,
        "_id": "2b4c0d23-8ada-4743-8d60-4735cbbcefd9"
    },
    {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "name": "New Zealand",
        "city": "Auckland",
        "duration": 15,
        "departure": "2021-12-27",
        "image": "https://images.adsttc.com/media/images/60c1/c36e/f91c/8147/5a00/00cd/newsletter/shutterstock_529150330.jpg?1623311193",
        "_createdOn": 1628152386919,
        "_id": "b79091e9-7b05-4bad-93b8-1e11c26682fe"
    },
    {
        "_ownerId": "68431ef7-9efd-404f-9fd5-48ba4befaad0",
        "name": "Canada",
        "city": "Toronto",
        "duration": 20,
        "departure": "2020-03-10",
        "image": "https://mediaim.expedia.com/destination/7/3224f0c851f315db5f5d3d377f63a537.jpg?impolicy=fcrop&w=800&h=533&q=high",
        "_createdOn": 1628152527572,
        "_id": "5a487b22-e19b-4b12-822a-94f854b8e5ab"
    }
]
```

and we can start typing logic...