export default {
    port: 1337,
    dbUri: 'mongodb+srv://johanes:REUPofc72DfmXIfG@cluster0.efbglzg.mongodb.net/?retryWrites=true&w=majority',
    saltWorkFactor: 10,
    password: 'REUPofc72DfmXIfG',
    accessTokenTtl: '1m',
    refreshTokenTtl: '1y',
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3JobXmbg6uKqrSMcKSwVQkflbU41f28N8dj86+MTRUu2asF5
psYvOFkzCEZaXJc1KKgh6Ce4qCdrmGdnCYwwDnXnqw1Mo0WVkukP67lF775d2e9n
qmUNb+irp6e/2HaijbIIzawj5CoNdX7rO86OIXei9YHflCobXMNdk+WyVk7XuUig
EMc3Wd8Pe9Fr4RGbjUvZeLNFPl1IU7YkLjoxugTJHYE6Ko2fVp+WX6GgcxwtZjoH
cvPCP8yXNjJHccA4dyxLiZqrv2ng/fBwgq8haWwOPYsYBzOlzRI72D5wmKP9qnup
WQNFB+5ZJN77U1IXlmb5IhRw1HhuQ3MScNmHOwIDAQABAoIBAQDJV2IZZB5uYxjR
0xS1w0VX7FTK0bHkMFDy5k/ZX7RL79F7WECW5ZVdgZQhPkzk6yEajXH8+JwB5ZC/
VcjmHuwRlq0uIoJLFoxwvITKaZwaN45jBa2BCKAd/qcE6wcfIxAz8UU1qqJLcdI8
5ez+9gQlKZMzLikIivHUVX9IKEH/oF2ojyMir/Ax9N/pOstIA742bJPjd4HSRYiA
Wsj3GRwv+n4QSJS3hdsz2XMPpMVSGXw7dtJucnFrei9SK9ew6sO9o6WxzEVMNhlM
Ym1F9bSr3pzusxME+vGwuEF3w9ESXmvlvleI69kVyMIXda509z7qJjoinzpizE1W
NdfopZSJAoGBAPt6S9Uyab/aaH4wOBO7GPH2NUjcy1PGdP/I7iOBJbH7S4Fqin+w
G6JbuOK4bSCJtP7WnbraFK7HuLCP70P0M0svKM/IoWi/Uk5jYn0nirXA3TfuACjf
4fsMYANc1B2ml/zXtMlt5X73YLuQAnO2okN0ifssH/QlRCf+fpIIovKlAoGBAOCR
q8e9pBXEhum1UTE06G/AXBk1jkHp5DSkJ8R53e31rJ2jwkqi8FoyXqQaoAkf67gg
+uoiK4CLxWV0vAgYulIQ6bnMDNQvIEaWRptUlwLb92mD6CRqj2JQLcZzB6TXAkYh
eDw743XlVfcL+9zrd7CwZRlZJvJUQ0H5djlGDsxfAoGAIeLd2xGa/FYy5GYc+FOq
zdfuYC4YW+aPF3R82l3ptWz2RK8VkJUrdBpF9I8DbXIA6KIEyQvf45lYArqydAaw
7r2hEzamwVWegp+TwueUIl+lr4arkNZyPgDx4yIcFw6+xjxOySG83fn5l+yU2ADR
JqPKgAT3HU/0Oitp5MWzJ10CgYAn7T5hcPIvfJWQD9Czsvhwhf7Z7I+yYGdWhKkd
YZ13pWpfTLJKmtWo87On8aPqe2ZpglOaNSEO5cre0vZrahoWZTNo+UJ+pzJR2n4L
N+rxczJ17CHl95wumprI4cLGKAQbe+/opa03VOMH3XWWPbc2DuaqrxMhmqGqpTPD
0xTmeQKBgQDYsFPu+Yn3FBmE2NMMErxJSQqsKgAxgfMSxJCTa6dNHszkv86VDck8
qQOikP9dsEESBHQa86h0EogHNBEbG4OrwSMPjnE4jcR4dceVWIytTjltLHeZEy9P
EzMyR3SKjg3s1yDBRKKv21xh+SxZvcfukw8qQjOcnFErEkkJ3Lza9g==
-----END RSA PRIVATE KEY-----`,
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3JobXmbg6uKqrSMcKSwV
QkflbU41f28N8dj86+MTRUu2asF5psYvOFkzCEZaXJc1KKgh6Ce4qCdrmGdnCYww
DnXnqw1Mo0WVkukP67lF775d2e9nqmUNb+irp6e/2HaijbIIzawj5CoNdX7rO86O
IXei9YHflCobXMNdk+WyVk7XuUigEMc3Wd8Pe9Fr4RGbjUvZeLNFPl1IU7YkLjox
ugTJHYE6Ko2fVp+WX6GgcxwtZjoHcvPCP8yXNjJHccA4dyxLiZqrv2ng/fBwgq8h
aWwOPYsYBzOlzRI72D5wmKP9qnupWQNFB+5ZJN77U1IXlmb5IhRw1HhuQ3MScNmH
OwIDAQAB
-----END PUBLIC KEY-----`,
    googleClientId: '430585250432-on2fs3rid5qi9p58pgbn1d8hbd6i8pis.apps.googleusercontent.com',
    googleClientSecret: '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',
    googleOauthRedirectUrl: 'http://localhost:1337/api/sessions/oauth/google'
};
