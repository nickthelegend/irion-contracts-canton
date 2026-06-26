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

var pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4 = require('@@irion/daml-prim-DA-Types-1.0.0');
var pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 = require('@@irion/ghc-stdlib-DA-Internal-Template-1.0.0');

exports.Token = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Token:Token',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Token:Token',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        issuer: damlTypes.Party.decoder,
        owner: damlTypes.Party.decoder,
        amount: damlTypes.Numeric(10).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        issuer: damlTypes.Party.encode(__typed__.issuer),
        owner: damlTypes.Party.encode(__typed__.owner),
        amount: damlTypes.Numeric(10).encode(__typed__.amount),
      };
    },
    Archive: {
      template: function () { return exports.Token; },
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
    Token_Merge: {
      template: function () { return exports.Token; },
      choiceName: 'Token_Merge',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Token_Merge.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Token_Merge.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(exports.Token).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Token).encode(__typed__); },
    },
    Token_Split: {
      template: function () { return exports.Token; },
      choiceName: 'Token_Split',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Token_Split.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Token_Split.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.Token), damlTypes.ContractId(exports.Token)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.Token), damlTypes.ContractId(exports.Token)).encode(__typed__); },
    },
    Token_Transfer: {
      template: function () { return exports.Token; },
      choiceName: 'Token_Transfer',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Token_Transfer.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Token_Transfer.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(exports.Token).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Token).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.Token, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.Token_Merge = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      otherCid: damlTypes.ContractId(exports.Token).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      otherCid: damlTypes.ContractId(exports.Token).encode(__typed__.otherCid),
    };
  },
};

exports.Token_Split = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      splitAmount: damlTypes.Numeric(10).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      splitAmount: damlTypes.Numeric(10).encode(__typed__.splitAmount),
    };
  },
};

exports.Token_Transfer = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      newOwner: damlTypes.Party.decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      newOwner: damlTypes.Party.encode(__typed__.newOwner),
    };
  },
};
