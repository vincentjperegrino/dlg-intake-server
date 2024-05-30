'use strict';

class ResponseMapper {
    constructor(entity, objects) {
        this.entity = entity;
        this.objects = objects;
    }

    responseMap() {
        if (Array.isArray(this.objects)) {
            const newObjectArray = [];
            this.objects.forEach((object) => {
                const newObject = {}
                for (const key of Object.keys(this.entity)) {
                    newObject[key] = object[key];
                }

                newObjectArray.push(newObject);
            });

            return this.wrapResponse(newObjectArray);
        }

        if (typeof (this.objects) === 'object') {
            const newObject = {};
            for (const key of Object.keys(this.entity)) {
                newObject[key] = this.objects[key];
            }

            return this.wrapResponse(newObject);
        }

        return this.wrapResponse({});
    }

    wrapResponse (response) {
        return {
            data : response
        };
    }
}

module.exports = ResponseMapper;
