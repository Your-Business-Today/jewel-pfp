export const sealConfigurations = {
  twoIntumescent: 'twoIntumescent',
  oneIntumescent: 'oneIntumescent',
  intumescentWithSmoke: 'intumescentWithSmoke'
};

export const everySealConfiguration = Object.values(sealConfigurations);

const parallelOffset = 0.012;

export const sealChoices = [
  { configuration: sealConfigurations.twoIntumescent, title: 'Two parallel intumescent strips', stripOffsets: [-parallelOffset, parallelOffset], hasSmokeFin: false },
  { configuration: sealConfigurations.oneIntumescent, title: 'One intumescent strip only', stripOffsets: [0], hasSmokeFin: false },
  { configuration: sealConfigurations.intumescentWithSmoke, title: 'One intumescent strip with a cold smoke seal', stripOffsets: [0], hasSmokeFin: true }
];

/** @param {string} configuration */
export function sealChoiceFor(configuration) {
  return sealChoices.find((choice) => choice.configuration === configuration) ?? sealChoices[0];
}

export const sealPartKeys = ['seals', 'smokeSeal'];
