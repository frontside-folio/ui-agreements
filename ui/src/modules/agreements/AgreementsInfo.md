Result of calling 

curl --header "X-Okapi-Tenant: diku" "http://localhost:9130/kiwt/config/schema/subscriptionAgreement" -X GET

{
    "$schema": "http://json-schema.org/schema#",
    "$id": "http://localhost:9130/kiwt/config/schema/SubscriptionAgreement",
    "title": "Subscription Agreement",
    "type": "object",
    "required": ["name"],
    "properties": {
        "vendorReference": {
            "type": "string"
        },
        "startDate": {
            "format": "date-time",
            "type": "string"
        },
        "renewalDate": {
            "format": "date-time",
            "type": "string"
        },
        "nextReviewDate": {
            "format": "date-time",
            "type": "string"
        },
        "items": {
            "type": "array",
            "items": {
                "anyOf": [{
                    "$ref": "http://localhost:9130/kiwt/config/schema/AgreementLineItem"
                }, {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        }
                    }
                }]
            }
        },
        "name": {
            "type": "string"
        },
        "localReference": {
            "type": "string"
        },
        "agreementType": {
            "anyOf": [{
                "$ref": "http://localhost:9130/kiwt/config/schema/RefdataValue"
            }, {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    }
                }
            }]
        },
        "version": {
            "type": "integer"
        },
        "enabled": {
            "type": "boolean"
        },
        "endDate": {
            "format": "date-time",
            "type": "string"
        }
    }
}
