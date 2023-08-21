// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { StringUtility } from '../../utility/StringUtility';

describe(`StringUtility Tests`, () => {
    it(`compareNoCase`, () => {
        expect(StringUtility.compareNoCase(`hello`, `hello`)).to.equal(true);
        expect(StringUtility.compareNoCase(`hello`, `hi`)).to.equal(false);
        expect(StringUtility.compareNoCase(`hello`, undefined)).to.equal(false);
        expect(StringUtility.compareNoCase(null, `hi`)).to.equal(false);
        expect(StringUtility.compareNoCase(undefined, undefined)).to.equal(true);
        expect(StringUtility.compareNoCase(null, null)).to.equal(true);
        expect(StringUtility.compareNoCase(undefined, null)).to.equal(false);
        expect(StringUtility.compareNoCase(`hello`, `HELLO`)).to.equal(true);
    });

    it(`generateRoutingHeaderAsync`, async () => {
        let routingHeader = await StringUtility.generateRoutingHeaderAsync(``);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(``);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`   `);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(undefined);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`Glück`);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`Gléck`);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`こんにちわ`);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias@alias.al`);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias%alias`);
        expect(routingHeader.length).to.equal(13);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`myverylongusername`);
        expect(routingHeader.length).to.equal(13);
        expect(routingHeader.startsWith(`myverylo-`)).to.equal(true);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`alias`);
        expect(routingHeader.length).to.equal(10);
        expect(routingHeader.startsWith(`alias-`)).to.equal(true);

        const routingHeader2 = await StringUtility.generateRoutingHeaderAsync(`alias`);
        expect(routingHeader2).not.to.equal(routingHeader);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(` alias `);
        expect(routingHeader.length).to.equal(10);
        expect(routingHeader.startsWith(`alias-`)).to.equal(true);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`ALIAS`);
        expect(routingHeader.length).to.equal(10);
        expect(routingHeader.startsWith(`alias-`)).to.equal(true);

        routingHeader = await StringUtility.generateRoutingHeaderAsync(`My Username`);
        expect(routingHeader.length).to.equal(13);
        expect(routingHeader.startsWith(`myuserna-`)).to.equal(true);
    });
});