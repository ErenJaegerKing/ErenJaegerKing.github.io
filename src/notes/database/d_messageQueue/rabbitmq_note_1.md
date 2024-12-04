---
icon: ""
description: ""
title: "RabbitMQ"
date: 2024-09-16
category:
  - 消息中间件
tag:
  - RabbitMQ
---
::: info
本页面来自黑马程序员的公开课程:Spring微服务入门的RabbitMQ
:::


##### 下载镜像
`docker pull rabbitmq:3.13-management`

[RabbitMQ镜像地址](https://hub.docker.com/_/rabbitmq)
>带management是有图形界面插件的
##### 安装MQ
```
docker run \
 -e RABBITMQ_DEFAULT_USER=root \
 -e RABBITMQ_DEFAULT_PASS=123456 \
 -v mq-plugins:/plugins \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3.13-management
```
[参数的意义文档](https://www.rabbitmq.com/docs)
##### 打开控制台界面
http://localhost:15672/
##### SpringAMQP
>SpringAMQP是基于RabbitMQ封装的一套模板，并且还利用SpringBoot对其实现了自动装配，使用起来非常方便[SpringAmqp的官方地址](<https://spring.io/projects/spring-amqp>)
```
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-amqp -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
    <version>3.1.5</version>
</dependency>
```
##### 配置MQ地址
```
spring:
  rabbitmq:
    host: localhost# 主机名
    port: 5672 # 端口
    virtual-host: / # 虚拟主机
    username: root # 用户名
    password: 123456 # 密码
    listener:
      simple:
        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息
```
##### WorkQueue
>Work queues，也被称为（Task queues），任务模型。简单来说就是让多个消费者绑定到一个队列，共同消费队列中的消息。

```
//发送消息
rabbitTemplate.convertAndSend(queueName, msg);

//接受消息
@RabbitListener(queues = "$queueName")
public void listener(String msg) {
    System.out.println(msg);
}
```
##### 发布/订阅
>-   Publisher：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）

-   Exchange：交换机。一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。Exchange有以下3种类型：
    -   Fanout：广播，将消息交给所有绑定到交换机的队列
    -   Direct：定向，把消息交给符合指定routing key 的队列
    -   Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列
-   Consumer：消费者，与以前一样，订阅队列，没有变化
-   Queue：消息队列也与以前一样，接收消息、缓存消息。
>Exchange（交换机）只负责转发消息，不具备存储消息的能力
##### Fanout
```
//接收信息
@Configuration
public class FanoutConfig {
    /**
     * 声明交换机
     * @return Fanout类型交换机
     */
    @Bean
    public FanoutExchange fanoutExchange(){
        return new FanoutExchange("exchange.fanout");
    }

    /**
     * 第1个队列
     */
    @Bean
    public Queue fanoutQueue1(){
        return new Queue("fanout.queue1");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue1(Queue fanoutQueue1, FanoutExchange fanoutExchange){
        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);
    }

    /**
     * 第2个队列
     */
    @Bean
    public Queue fanoutQueue2(){
        return new Queue("fanout.queue2");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue2(Queue fanoutQueue2, FanoutExchange fanoutExchange){
        return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);
    }
}
//接收消息
@RabbitListener(queues = "$queueName")
public void listener(String msg) {
    System.out.println(msg);
}
//发送消息
rabbitTemplate.convertAndSend(exchangeName, "", msg);
```
##### Direct

```
//接收消息
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "direct.queue1"),
    exchange = @Exchange(name = "exchange.direct", type = ExchangeTypes.DIRECT),
    key = {"red", "blue"}
))
public void listener(String msg){
    System.out.println(msg);
}
//发送消息
rabbitTemplate.convertAndSend(exchangeName, key, message);
```
##### Topic
```
//接收消息
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "topic.queue1"),
    exchange = @Exchange(name = "exchange.direct", type = ExchangeTypes.DIRECT),
    key = "key"
))
public void listener(String msg){
    System.out.println(msg);
}
//发送消息
rabbitTemplate.convertAndSend(exchangeName, key, message);
```

##### 配置JSON转换器

```
<dependency>
     <groupId>com.fasterxml.jackson.dataformat</groupId>
     <artifactId>jackson-dataformat-xml</artifactId>
     <version>2.9.10</version>
 </dependency>
```
```
@Bean
public MessageConverter jsonMessageConverter(){
    return new Jackson2JsonMessageConverter();
}
```
##### 消息的可靠性
>RabbitMQ提供了publisher confirm机制来避免消息发送到MQ过程中丢失。这种机制必须给每个消息指定一个唯一ID。消息发送到MQ以后，会返回一个结果给发送者，表示消息是否处理成功。

返回结果有两种方式：

-   publisher-confirm，发送者确认
    -   消息成功投递到交换机，返回ack
    -   消息未投递到交换机，返回nack
-   publisher-return，发送者回执
    -   消息投递到交换机了，但是没有路由到队列。返回ACK，及路由失败原因。
###### 生产者消息确认
添加配置
```
spring:
  rabbitmq:
    publisher-confirm-type: correlated
    publisher-returns: true
    template:
      mandatory: true
```
-   `publish-confirm-type`：开启publisher-confirm，这里支持两种类型：

    -   `simple`：同步等待confirm结果，直到超时
    -   `correlated`：异步回调，定义ConfirmCallback，MQ返回结果时会回调这个ConfirmCallback

-   `publish-returns`：开启publish-return功能，同样是基于callback机制，不过是定义ReturnCallback

-   `template.mandatory`：定义消息路由失败时的策略。true，则调用ReturnCallback；false：则直接丢弃消息

定义Return回调

```
@Slf4j
@Configuration
public class CommonConfig implements ApplicationContextAware {
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        RabbitTemplate rabbitTemplate = applicationContext.getBean(RabbitTemplate.class);
        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -> {
            log.info("消息发送失败，应答码{}，原因{}，交换机{}，路由键{},消息{}",
                     replyCode, replyText, exchange, routingKey, message.toString());
        });
    }
}
```
定义ConfirmCallback

```
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString())	
    correlationData.getFuture().addCallback(
        result -> {
            if(result.isAck()){
                log.debug("消息发送成功, ID:{}", correlationData.getId());
            }else{
                log.error("消息发送失败, ID:{}, 原因{}",correlationData.getId(), result.getReason());
            }
        },
        ex -> log.error("消息发送异常, ID:{}, 原因{}",correlationData.getId(),ex.getMessage())
    );
    rabbitTemplate.convertAndSend(exchangeName, bindingKey, msg, correlationData);
```
##### MQ持久化
交换机持久化

```@Bean
public DirectExchange simpleExchange(){
    // 三个参数：交换机名称、是否持久化、当没有queue与其绑定时是否自动删除
    return new DirectExchange("simple.direct", true, false);
}
```
队列持久化

```@Bean
public Queue simpleQueue(){
    // 使用QueueBuilder构建队列，durable就是持久化的
    return QueueBuilder.durable("simple.queue").build();
}
```
消息持久化

```
Message message = MessageBuilder
        .withBody("hello".getBytes(StandardCharsets.UTF_8))
        .setDeliveryMode(MessageDeliveryMode.PERSISTENT)
        .build();
```
##### 消费者确认机制
>SpringAMQP则允许配置三种确认模式：

- manual：手动ack，需要在业务代码结束后，调用api发送ack。
- auto：自动ack，由spring监测listener代码是否出现异常，没有异常则返回ack；抛出异常则返回nack
- none：关闭ack，MQ假定消费者获取消息后会成功处理，因此消息投递后立即被删除

```
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: autp
```
##### 失败重试机制
本地重试
```
spring:
  rabbitmq:
    listener:
      simple:
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 1000 # 初识的失败等待时长为1秒
          multiplier: 1 # 失败的等待时长倍数，下次等待时长 = multiplier * last-interval
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false
```
失败策略

在开启重试模式后，重试次数耗尽，如果消息依然失败，则需要有MessageRecovery接口来处理，它包含三种不同的实现：

-   RejectAndDontRequeueRecoverer：重试耗尽后，直接reject，丢弃消息。默认就是这种方式
-   ImmediateRequeueMessageRecoverer：重试耗尽后，返回nack，消息重新入队
-   RepublishMessageRecoverer：重试耗尽后，将失败消息投递到指定的交换机


```
@Configuration
public class ErrorMessageConfig {
    @Bean
    public DirectExchange errorMessageExchange(){
        return new DirectExchange("error.direct");
    }
    @Bean
    public Queue errorQueue(){
        return new Queue("error.queue", true);
    }
    @Bean
    public Binding errorBinding(Queue errorQueue, DirectExchange errorMessageExchange){
        return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with("error");
    }
    @Bean
    public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){
        return new RepublishMessageRecoverer(rabbitTemplate, "error.direct", "error");
    }
}
```
##### 如何确保RabbitMQ消息的可靠性？

-   开启生产者确认机制，确保生产者的消息能到达队列
-   开启持久化功能，确保消息未消费前在队列中不会丢失
-   开启消费者确认机制为auto，由spring确认消息处理成功后完成ack
-   开启消费者失败重试机制，并设置MessageRecoverer，多次重试失败后将消息投递到异常交换机，交由人工处理
##### 死信交换机
>如果这个包含死信的队列配置了`dead-letter-exchange`属性，指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机称为**死信交换机**（Dead Letter Exchange，检查DLX）。


```
// 声明普通的 simple.queue队列，并且为其指定死信交换机：dl.direct
@Bean
public Queue simpleQueue2(){
    return QueueBuilder.durable("simple.queue") // 指定队列名称，并持久化
        .deadLetterExchange("dl.direct") // 指定死信交换机
        .build();
}
// 声明死信交换机 dl.direct
@Bean
public DirectExchange dlExchange(){
    return new DirectExchange("dl.direct", true, false);
}
// 声明存储死信的队列 dl.queue
@Bean
public Queue dlQueue(){
    return new Queue("dl.queue", true);
}
// 将死信队列 与 死信交换机绑定
@Bean
public Binding dlBinding(){
    return BindingBuilder.bind(dlQueue()).to(dlExchange()).with("simple");
}
```
什么样的消息会成为死信？

-   消息被消费者reject或者返回nack
-   消息超时未消费
-   队列满了

死信交换机的使用场景是什么？

-   如果队列绑定了死信交换机，死信会投递到死信交换机；
-   可以利用死信交换机收集所有消费者处理失败的消息（死信），交由人工处理，进一步提高消息队列的可靠性。
##### 延迟队列
消费者

```
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "dl.ttl.queue", durable = "true"),
    exchange = @Exchange(name = "dl.ttl.direct"),
    key = "ttl"
))
public void listenDlQueue(String msg){
    log.info("接收到 dl.ttl.queue的延迟消息：{}", msg);
}
```
创建交换机队列，并绑定，设置TTL

```
@Bean
public Queue ttlQueue(){
    return QueueBuilder.durable("ttl.queue") // 指定队列名称，并持久化
        .ttl(10000) // 设置队列的超时时间，10秒
        .deadLetterExchange("dl.ttl.direct") // 指定死信交换机
        .build();
}
@Bean
public DirectExchange ttlExchange(){
    return new DirectExchange("ttl.direct");
}
@Bean
public Binding ttlBinding(){
    return BindingBuilder.bind(ttlQueue()).to(ttlExchange()).with("ttl");
}
```
 生产者
 
```
// 创建消息
    String message = "hello, ttl queue";
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("ttl.direct", "ttl", message, correlationData);
    // 记录日志
    log.debug("发送消息成功");
```
在生产者中设置TTL

```
@Test
public void testTTLMsg() {
    // 创建消息
    Message message = MessageBuilder
        .withBody("hello, ttl message".getBytes(StandardCharsets.UTF_8))
        .setExpiration("5000")
        .build();
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("ttl.direct", "ttl", message, correlationData);
    log.debug("发送消息成功");
}
```
消息超时的两种方式是？

-   给队列设置ttl属性，进入队列后超过ttl时间的消息变为死信
-   给消息设置ttl属性，队列接收到消息超过ttl时间后变为死信

如何实现发送一个消息20秒后消费者才收到消息？

-   给消息的目标队列指定死信交换机
-   将消费者监听的队列绑定到死信交换机
-   发送消息时给消息设置超时时间为20秒
* * *
安装DelayExchange插件

[官方的安装指南地址](https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq)

[官方的插件社区](https://www.rabbitmq.com/community-plugins.html)

[GitHub页面](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)

安装后放入容器数据卷中

`docker exec -it mq bash`

`rabbitmq-plugins enable rabbitmq_delayed_message_exchange`

消费者

```
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "delay.queue", delayed = "true"),
    exchange = @Exchange(name = "dl.ttl.direct"),
    key = "delay"
))
public void listenDlQueue(String msg){
    log.info("接收到 dl.ttl.queue的延迟消息：{}", msg);
}
```
创建交换机队列，并绑定

```
@Bean
public Queue delayedQueue() {
        return new Queue("delay.queue");
}
@Bean
public DirectExchange delayedExchange(){
    return ExchangeBuilder
    .directExchange("delay.direct")
    .durable(true)
    .build();
}
@Bean
public Binding delayedBinding(){
    return BindingBuilder.bind(delayedQueue()).to(delayedExchange()).with("delay");
}
```
 生产者
 
```
    // 创建消息
    Message message = MessageBuilder
        .withBody("hello, dalyed message".getBytes(StandardCharsets.UTF_8))
            .setHeader("X-delay,1000)
            .build();
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("delay.direct", "delay", message, correlationData);
    log.debug("发送消息成功");
```
延迟队列插件的使用步骤包括哪些？

•声明一个交换机，添加delayed属性为true

•发送消息时，添加x-delay头，值为超时时间
