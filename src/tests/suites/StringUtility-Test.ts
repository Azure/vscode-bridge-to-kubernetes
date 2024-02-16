// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import { describe, it } from 'mocha';
import { StringUtility } from '../../utility/StringUtility';

describe(`StringUtility Tests`, () => {
    it(`compareNoCase`, () => {
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(`hello`, `hello`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(`hello`, `hi`)).to.be.false)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(`hello`, undefined)).to.be.false)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(null, `hi`)).to.be.false)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(undefined, undefined)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(null, null)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(undefined, null)).to.be.false)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(StringUtility.compareNoCase(`hello`, `HELLO`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it(`generateRoutingHeaderAsync`, async () => {
        let routingHeader = await StringUtility.generateRoutingHeaderAsync(``);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(``);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`   `);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(undefined);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`Glück`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`Gléck`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`こんにちわ`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias@alias.al`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias%alias`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`myverylongusername`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(routingHeader.startsWith(`myverylo-`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(10))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(routingHeader.startsWith(`alias-`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        const routingHeader2 = await StringUtility.generateRoutingHeaderAsync(`alias`);
        import('chai')
            .then(chai => chai.expect(routingHeader2).not.to.equal(routingHeader))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(` alias `);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(10))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(routingHeader.startsWith(`alias-`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`ALIAS`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(10))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(routingHeader.startsWith(`alias-`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`My Username`);
        import('chai')
            .then(chai => chai.expect(routingHeader.length).to.equal(13))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(routingHeader.startsWith(`myuserna-`)).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });
});