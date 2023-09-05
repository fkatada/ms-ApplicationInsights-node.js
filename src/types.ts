// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OTLPExporterNodeConfigBase } from "@opentelemetry/otlp-exporter-base";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.0.0-beta.3";
export const DEFAULT_ROLE_NAME = "Web";
process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;


export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";

export enum StatsbeatFeature {
  DISK_RETRY = 0,
  AAD_HANDLING = 1,
  WEB_SNIPPET = 2,
  DISTRO = 4,
}

export enum StatsbeatInstrumentation {
  AZURE_CORE_TRACING = 0,
  MONGODB = 1,
  MYSQL = 2,
  REDIS = 4,
  POSTGRES = 8,
}


/**
 * Azure Monitor OpenTelemetry Options
 */
export interface AzureMonitorOpenTelemetryOptions {
  /** Azure Monitor Exporter Configuration */
  azureMonitorExporterConfig?: AzureMonitorExporterOptions;
  /** OpenTelemetry Resource */
  resource?: Resource;
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  samplingRatio?: number;
  /**
   * OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentationOptions?: InstrumentationOptions;
}

/**
 * OpenTelemetry Instrumentations Configuration interface
 */
export interface InstrumentationOptions {
  /** Azure SDK Instrumentation Config */
  azureSdk?: InstrumentationConfig;
  /** HTTP Instrumentation Config */
  http?: InstrumentationConfig;
  /** MongoDB Instrumentation Config */
  mongoDb?: InstrumentationConfig;
  /** MySQL Instrumentation Config */
  mySql?: InstrumentationConfig;
  /** PostgreSql Instrumentation Config */
  postgreSql?: InstrumentationConfig;
  /** Redis Instrumentation Config */
  redis?: InstrumentationConfig;
  /** Redis4 Instrumentation Config */
  redis4?: InstrumentationConfig;
}


/**
 * Azure Monitor OpenTelemetry Options
 */
export interface ApplicationInsightsOptions extends AzureMonitorOpenTelemetryOptions {
    /**
     * Sets the state of exception tracking (enabled by default)
     * if true uncaught exceptions will be sent to Application Insights
     */
    enableAutoCollectExceptions?: boolean;
    /**
     * Log Instrumentations configuration included as part of Application Insights (console, bunyan, winston)
     */
    logInstrumentationOptions?: LogInstrumentationOptions;
    /** OTLP Trace Exporter Configuration */
    otlpTraceExporterConfig?: OTLPExporterConfig;
    /** OTLP Metric Exporter Configuration */
    otlpMetricExporterConfig?: OTLPExporterConfig;
    /** OTLP Log Exporter Configuration */
    otlpLogExporterConfig?: OTLPExporterConfig;
    /**
  * Sets the state of performance tracking (enabled by default)
  * if true performance counters will be collected every second and sent to Azure Monitor
  */
    enableAutoCollectPerformance?: boolean;
    /**
     * Specific extended metrics, applicationinsights-native-metrics package need to be available
     */
    extendedMetrics?: { [type: string]: boolean };
}

/**
 * OTLP Exporter Options
 */
export interface OTLPExporterConfig extends OTLPExporterNodeConfigBase {
    /** Enable/Disable OTLP Exporter */
    enabled?: boolean;
  }

export interface LogInstrumentationOptions {
    console?: { enabled: boolean };
    bunyan?: { enabled: boolean };
    winston?: { enabled: boolean };
}

export const enum ExtendedMetricType {
    gc = "gc",
    heap = "heap",
    loop = "loop",
}
