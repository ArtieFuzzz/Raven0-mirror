/* eslint-disable @typescript-eslint/method-signature-style */
import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { Presence } from 'discord.js'
import EventEmitterSingleton from '../structures/EventEmitterSingleton'
import { WebhookLogger } from '../structures/WebhookLogger'
import BotClient from './BotClient'
import { KSoftClient } from '@ksoft/api'
import srod from 'srod-v2'
import XennonStore from 'xennon'

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    inhibitorHandler: InhibitorHandler
    logger: WebhookLogger
    customEmitter: EventEmitterSingleton
    ksoft: KSoftClient
    srod: srod
    store: XennonStore

    start(): Promise<BotClient>
    changeStatus(): Promise<Presence>
    stop(): void
  }

  interface CommandHelpInformation extends Object {
    usage?: string
    examples?: string[]
  }

  interface Command {
    help?: CommandHelpInformation
  }
}

declare module 'discord.js' {
  interface Message {
    client: AkairoClient
  }
}
