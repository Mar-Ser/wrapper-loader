const path = require('path');
const fs = require('fs');
const { expect } = require('chai');
const webpack = require('webpack');

const entryFilePath = path.join(__dirname, 'source/entry.js');
const outputDirPath = path.join(__dirname, 'build');
const outputFileName = 'build.js';
const outputFilePath = path.join(outputDirPath, outputFileName);

function getTestWebPackConfig(loaderConfig) {
    return {
        mode: 'none',
        entry: entryFilePath,
        output: {
            path: outputDirPath,
            filename: outputFileName
        },
        module: {
            rules: [
                loaderConfig
            ]
        }
    };
}

describe('Webpack replace loader ...', function() {
    it('should replace with data', function(done) {
        webpack(getTestWebPackConfig({
                test: /\.js$/,
                loader: path.resolve(__dirname, '../index.js'),
                options: {
                    template: '/*<%= name %>*/export default function(){<%= content %>}',
                    data: {
                        name: 'wrapper-loader'
                    }
                }
            }),
            function(error, stats) {
                expect(error).to.equal(null);
                fs.readFile(outputFilePath, 'utf8', function(error, contents) {
                    expect(error).to.equal(null);
                    expect(contents).to.be.a('string');
                    expect(contents).to.not.include('<%= name %>');
                    expect(contents).to.not.include('<%= content %>');
                    expect(contents).to.include('/*wrapper-loader*/');
                    done();
                })
            }
        );
    });
});