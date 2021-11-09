const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// assertion style
chai.should();
let assert = chai.assert;

let token;

chai.use(chaiHttp);
describe('Hackerbay Node Microservice API', () => {
    /**
     * Test the POST route for login
     */
    describe('POST /login', () => {
        it("It should log user in and return jwt", (done) => {
            let user = {
                username: "abeeb2021",
                password: "password123"
            };

            chai.request(app)
                .post("/api/v1/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    assert.equal(res.body.status,"success");
                    token = res.body.token;
                    done();
                })
        })

        it("It should not log user in if no username and password provided", (done) => {
            let user = {
                username: "",
                password: ""
            };

            chai.request(app)
                .post("/api/v1/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.status,"error");
                    done();
                })
        })
    })

    /**
     * Test the POST route for thumbnail
     */
    describe('POST /thumbnail', () => {
        it('It should download an image from the provided uri and resize', (done) => {
            let uriLink = {
                uri: "https://res.cloudinary.com/dogxpnhoa/image/upload/v1636298434/node-image_q7b0d8.png"
            };
            chai.request(app)
                .post('/api/v1/thumbnail')
                .set({Authorization: `Bearer ${token}`})
                .send(uriLink)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    assert.equal(res.body.status,"success");
                    done();
                });
        })

        it('It should not download an image if no uri is specified', (done) => {
            let uriLink = {
                uri: ""
            };
            chai.request(app)
                .post('/api/v1/thumbnail')
                .set({Authorization: `Bearer ${token}`})
                .send(uriLink)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.status,"error");
                    done();
                });
        })

        it('It should not download an image if not authenticated', (done) => {
            let uriLink = {
                uri: "https://res.cloudinary.com/dogxpnhoa/image/upload/v1636298434/node-image_q7b0d8.png"
            };
            chai.request(app)
                .post('/api/v1/thumbnail')
                // .set({Authorization: `Bearer ${token}`})
                .send(uriLink)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    assert.equal(res.body.status,"fail");
                    done();
                });
        })
    })

    /**
     * Test the PATCH route for json patch object
     */
    describe('PATCH /patchObject', () => {
        it('It should not patch json object if no object specified', (done) => {
            chai.request(app)
                .patch('/api/v1/patchObject')
                .set({Authorization: `Bearer ${token}`})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.status,"fail");
                    done();
                })
        })

        it('It should not patch json object if not authenticated', (done) => {
            chai.request(app)
                .patch('/api/v1/patchObject')
                // .set({Authorization: `Bearer ${token}`})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    assert.equal(res.body.status,"fail");
                    done();
                })
        })
    })
})