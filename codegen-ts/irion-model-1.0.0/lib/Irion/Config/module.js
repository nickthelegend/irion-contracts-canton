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

exports.Config = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      usdcIssuer: damlTypes.Party.decoder,
      creditIssuer: damlTypes.Party.decoder,
      borrowInterestRate: damlTypes.Numeric(10).decoder,
      uncollatPremiumRate: damlTypes.Numeric(10).decoder,
      starterLimit: damlTypes.Numeric(10).decoder,
      maxCreditLimit: damlTypes.Numeric(10).decoder,
      repayRewardRate: damlTypes.Numeric(10).decoder,
      minScoreUncollat: damlTypes.Int.decoder,
      minimumLiquidity: damlTypes.Numeric(10).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      usdcIssuer: damlTypes.Party.encode(__typed__.usdcIssuer),
      creditIssuer: damlTypes.Party.encode(__typed__.creditIssuer),
      borrowInterestRate: damlTypes.Numeric(10).encode(__typed__.borrowInterestRate),
      uncollatPremiumRate: damlTypes.Numeric(10).encode(__typed__.uncollatPremiumRate),
      starterLimit: damlTypes.Numeric(10).encode(__typed__.starterLimit),
      maxCreditLimit: damlTypes.Numeric(10).encode(__typed__.maxCreditLimit),
      repayRewardRate: damlTypes.Numeric(10).encode(__typed__.repayRewardRate),
      minScoreUncollat: damlTypes.Int.encode(__typed__.minScoreUncollat),
      minimumLiquidity: damlTypes.Numeric(10).encode(__typed__.minimumLiquidity),
    };
  },
};

exports.Config_Update = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      newConfig: exports.Config.decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      newConfig: exports.Config.encode(__typed__.newConfig),
    };
  },
};

exports.ProtocolConfig = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Config:ProtocolConfig',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Config:ProtocolConfig',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        config: exports.Config.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        config: exports.Config.encode(__typed__.config),
      };
    },
    Archive: {
      template: function () { return exports.ProtocolConfig; },
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
    Config_Update: {
      template: function () { return exports.ProtocolConfig; },
      choiceName: 'Config_Update',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Config_Update.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Config_Update.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(exports.ProtocolConfig).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(exports.ProtocolConfig).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.ProtocolConfig, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);
