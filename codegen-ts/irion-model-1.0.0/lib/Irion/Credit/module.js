"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });

/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');

var pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 = require('@@irion/ghc-stdlib-DA-Internal-Template-1.0.0');

var Irion_Config = require('../../Irion/Config/module');

exports.Attestation_Apply = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).decoder,
      profileCid: damlTypes.ContractId(exports.CreditProfile).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).encode(__typed__.configCid),
      profileCid: damlTypes.ContractId(exports.CreditProfile).encode(__typed__.profileCid),
    };
  },
};

exports.CreditAttestation = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Credit:CreditAttestation',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Credit:CreditAttestation',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        creditIssuer: damlTypes.Party.decoder,
        operator: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        approvedLimit: damlTypes.Numeric(10).decoder,
        score: damlTypes.Int.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        creditIssuer: damlTypes.Party.encode(__typed__.creditIssuer),
        operator: damlTypes.Party.encode(__typed__.operator),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        approvedLimit: damlTypes.Numeric(10).encode(__typed__.approvedLimit),
        score: damlTypes.Int.encode(__typed__.score),
      };
    },
    Archive: {
      template: function () { return exports.CreditAttestation; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
    Attestation_Apply: {
      template: function () { return exports.CreditAttestation; },
      choiceName: 'Attestation_Apply',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Attestation_Apply.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Attestation_Apply.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(exports.CreditProfile).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(exports.CreditProfile).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.CreditAttestation, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.CreditProfile = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Credit:CreditProfile',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Credit:CreditProfile',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        creditLimit: damlTypes.Numeric(10).decoder,
        outstanding: damlTypes.Numeric(10).decoder,
        repaidTotal: damlTypes.Numeric(10).decoder,
        repayments: damlTypes.Int.decoder,
        score: damlTypes.Int.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        creditLimit: damlTypes.Numeric(10).encode(__typed__.creditLimit),
        outstanding: damlTypes.Numeric(10).encode(__typed__.outstanding),
        repaidTotal: damlTypes.Numeric(10).encode(__typed__.repaidTotal),
        repayments: damlTypes.Int.encode(__typed__.repayments),
        score: damlTypes.Int.encode(__typed__.score),
      };
    },
    Archive: {
      template: function () { return exports.CreditProfile; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.CreditProfile, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);
