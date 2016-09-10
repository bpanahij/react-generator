import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
import Inspector from 'redux-devtools-inspector';
import SliderMonitor from 'redux-slider-monitor';

const DevTools = __DEBUG__ ? createDevTools(
  <DockMonitor defaultSize={0.5}
               toggleVisibilityKey='ctrl-d'
               changePositionKey='ctrl-p'
               defaultIsVisible={false}
               theme='solarized'
               changeMonitorKey='ctrl-m'>
    <LogMonitor/>
    <DiffMonitor/>
    <Inspector supportImmutable={true}/>
    <SliderMonitor/>
  </DockMonitor>
) : <span></span>;

export {DevTools};