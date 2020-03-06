/* eslint default-case: 0 */

import { constants, types, utils } from '@cgps/phylocanvas';
import defaults from './defaults';
const { mapScalar } = utils;

const { Angles, TreeTypes } = constants;

function mapScalarValues(tree, values) {
  const mappedValues = {};
  for (const key of Object.keys(values)) {
    mappedValues[key] = (values[key] / tree.state.scale);
  }
  return mappedValues;
}

export default function (tree, decorate) {
  decorate('getInitialState', (delegate, args) => {
    const [ options ] = args;
    const { metadata = {} } = options;
    return {
      ...delegate(...args),
      metadata: {
        ...defaults,
        ...metadata,
      },
    };
  });

  decorate('layout', (delegate, args) => {
    const { state } = tree;
    const layout = delegate(...args);

    if (!layout.metadata) {
      layout.metadata = {};
    }

    if (
      layout.metadata.values !== state.metadata.values ||
      layout.metadata.columns !== state.metadata.columns ||
      layout.metadata.blockPadding !== state.metadata.blockPadding ||
      layout.metadata.blockLength !== state.metadata.blockLength ||
      layout.metadata.fontSize !== state.fontSize
    ) {
      layout.metadata.columnWidths = {};
      layout.metadata.headerWidths = {};

      for (const columnName of state.metadata.columns) {
        // find the text of the longest label of the column
        let maxLabel = '';
        for (const node of layout.leafNodes) {
          if (!(node.id in state.metadata.values)) continue;
          const data = state.metadata.values[node.id][columnName];
          if (data) {
            if (typeof(data.label) === 'string') {
              if (data.label.length > maxLabel.length) {
                maxLabel = data.label;
              }
            } else {
              console.error('Invalid metadata label for node ', node.id, ' column ', columnName);
            }
          }
        }

        // measure the actual width of the longest label if found
        if (maxLabel.length) {
          layout.metadata.columnWidths[columnName] = tree.measureTextWidth(maxLabel);
        } else {
          layout.metadata.columnWidths[columnName] = 0;
        }

        // measure the width of the header label
        layout.metadata.headerWidths[columnName] = 2 * state.fontSize + tree.measureTextWidth(columnName, state.metadata.headerFontWeight);
      }
    }

    layout.metadata.blockLength = state.metadata.blockLength;
    layout.metadata.blockPadding = state.metadata.blockPadding;
    layout.metadata.columns = state.metadata.columns;
    layout.metadata.values = state.metadata.values;
    layout.metadata.fontSize = state.fontSize;

    return layout;
  });

  decorate('postRender', (delegate, args) => {
    const { ctx, state } = tree;
    const [ layout ] = args;
    const blockLength = mapScalar(tree, state.metadata.blockLength);
    const blockPadding = mapScalar(tree, state.metadata.blockPadding);
    const headerWidths = mapScalarValues(tree, layout.metadata.headerWidths);
    const columnWidths = mapScalarValues(tree, layout.metadata.columnWidths);
    const textPadding = mapScalar(tree, state.metadata.textPadding);
    const metadataLeafIds = new Set(Object.keys(state.metadata.values));
    const typeDef = types[state.type];
    const renderMetadataHeaders = (
      state.metadata.showHeaders &&
      typeDef.mainAxis &&
      (!typeDef.alignableLabels || typeDef.alignableLabels && tree.state.alignLabels)
    );
    const renderMetadataLabels = state.metadata.showLabels;

    // draw all columns when no columns specified
    const columnNames = state.metadata.columns || [];

    ctx.save();
    ctx.fillStyle = state.metadata.fillStyle;

    let startingX = textPadding;
    if (state.showNodes) {
      startingX += tree._.actualNodeSize;
    }
    if (state.renderLeafLabels) {
      startingX += tree._.actualMaxLabelWidth;
    }

    // render metadata headers
    if (renderMetadataHeaders) {
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = `${state.metadata.headerFontWeight} ${tree._.actualFontSize}px ${state.fontFamily}`;
      const node = layout.leafNodes[0];
      let angle = node.angle;
      if (!state.metadata.showLabels) {
        angle += Angles.Degrees90;
      }
      ctx.translate(node.x, node.y);
      ctx.rotate(node.angle);

      let x = startingX;
      if (typeDef.alignableLabels) {
        x += (tree.state.branchScale * (layout.rootNode.longestLeaf - node.distanceFromRoot));
      }
      const y = (state.stepScale * -0.5);

      for (let index = 0; index < columnNames.length; index++) {
        const columnName = columnNames[index];
        let columnWidth = blockPadding;

        if (renderMetadataLabels) {
          columnWidth += Math.max(
            headerWidths[columnName],
            blockPadding + blockLength + columnWidths[columnName]
          );
        } else {
          columnWidth += blockLength;
        }

        const translateX =
          renderMetadataLabels ?
            x + blockPadding + blockLength + textPadding :
            x + blockPadding + blockLength / 2;
        const translateY =
          renderMetadataLabels ?
            y - tree._.actualFontSize / 2 :
            y - textPadding;

        ctx.translate(translateX, translateY);
        if (!renderMetadataLabels) {
          ctx.rotate(-Angles.Degrees90);
        }
        ctx.fillText(columnName, 0, 0);
        if (!renderMetadataLabels) {
          ctx.rotate(Angles.Degrees90);
        }
        ctx.translate(-1 * translateX, -1 * translateY);

        x += columnWidth;
      }
      ctx.rotate(-node.angle);
      ctx.translate(-node.x, -node.y);
    }

    // block size should not be greater than tree step or max angle
    let maxSize = state.stepScale;
    let stepCorrection = 0;
    if (state.type === TreeTypes.Circular && tree.state.alignLabels) {
      const leafAngle = Angles.Degrees360 / layout.rootNode.totalLeaves;
      maxSize = leafAngle * (layout.rootNode.totalLeafLength * tree.state.branchScale + tree._.actualNodeSize + tree._.actualMaxLabelWidth);
      stepCorrection = leafAngle * (blockLength + blockPadding);
    } else if (state.type === TreeTypes.Radial) {
      maxSize = tree._.actualNodeSize;
    }
    const blockSize = Math.min(maxSize, state.blockSize || maxSize);

    ctx.font = `${tree._.actualFontSize}px ${state.fontFamily}`;

    // render metadata blocks for each leaf node
    for (const node of layout.leafNodes) {
      if (metadataLeafIds.has(node.id)) {
        const data = state.metadata.values[node.id];

        ctx.translate(node.x, node.y);
        ctx.rotate(node.angle);
        ctx.beginPath();

        let x = startingX;
        const y = 0;

        if (typeDef.alignableLabels && tree.state.alignLabels) {
          x += tree.state.branchScale * (layout.rootNode.longestLeaf - node.distanceFromRoot);
        }

        for (let index = 0; index < columnNames.length; index++) {
          const columnName = columnNames[index];
          if (typeof data[columnName] !== 'undefined' && !node.isHidden) {
            // render block
            ctx.fillStyle = data[columnName].colour || data[columnName];
            ctx.fillRect(x + blockPadding, y - blockSize / 2, blockLength, blockSize + (index * stepCorrection));

            // reset fill colour to default
            ctx.fillStyle = state.metadata.fillStyle;

            // render block label
            if (tree._.renderLabels && renderMetadataLabels && typeof data[columnName].label === 'string') {
              const invertedLabel = (node.angle > Angles.Degrees90) && (node.angle < Angles.Degrees270);
              if (invertedLabel) {
                ctx.rotate(Angles.Degrees180);
              }
              ctx.textAlign = invertedLabel ? 'right' : 'left';
              ctx.textBaseline = 'middle';
              ctx.fillText(
                data[columnName].label,
                (invertedLabel ? -1 : 1) * (x + blockPadding + blockLength + textPadding),
                y
              );
              if (invertedLabel) {
                ctx.rotate(-Angles.Degrees180);
              }
            }
          }
          const columnWidth = blockPadding + Math.max(
            (renderMetadataHeaders && renderMetadataLabels) ? headerWidths[columnName] : 0,
            renderMetadataLabels ? (blockPadding + blockLength + columnWidths[columnName]) : blockLength
          );
          x += columnWidth;
        }
        ctx.closePath();
        ctx.rotate(-node.angle);
        ctx.translate(-node.x, -node.y);
      }
    }

    ctx.restore();

    delegate(...args);
  });

  decorate('getDrawingArea', (delegate, args) => {
    const area = delegate(...args);

    const typeDef = types[tree.state.type];
    const layout = tree.layout();

    // these measurments are on the canvas plane therefore they need not to be mapped
    const blockLength = tree.state.metadata.blockLength;
    const blockPadding = tree.state.metadata.blockPadding;
    const headerWidths = layout.metadata.headerWidths;
    const columnWidths = layout.metadata.columnWidths;

    const renderMetadataLabels = tree.state.metadata.showLabels;
    const renderMetadataHeaders = (
      tree.state.metadata.showHeaders &&
      typeDef.mainAxis &&
      (!typeDef.alignableLabels || typeDef.alignableLabels && tree.state.alignLabels)
    );

    let length = 0;

    if (tree.state.renderLeafLabels) {
      length += layout.maxLabelWidth;
    }

    for (const columnName of tree.state.metadata.columns) {
      const columnWidth = blockPadding + Math.max(
        (renderMetadataHeaders && renderMetadataLabels) ? headerWidths[columnName] : 0,
        renderMetadataLabels ? (blockPadding + blockLength + columnWidths[columnName]) : blockLength
      );
      length += columnWidth;
    }

    let preX = 0;
    let postX = 0;
    let preY = 0;
    let postY = 0;
    switch (tree.state.type) {
      case TreeTypes.Rectangular:
      case TreeTypes.Diagonal:
        preY = renderMetadataHeaders ? tree.state.stepScale : 0;
        postX = length;
        break;
      case TreeTypes.Hierarchical:
        preX = renderMetadataHeaders ? tree.state.stepScale : 0;
        postY = length;
        break;
      case TreeTypes.Circular:
      case TreeTypes.Radial:
        preX = length;
        preY = length;
        postX = length;
        postY = length;
        break;
    }

    return ({
      width: area.width,
      height: area.height,
      left: area.left + preX,
      top: area.top + preY,
      right: area.right - postX,
      bottom: area.bottom - postY,
    });
  });
}
