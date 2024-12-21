import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-B5llbRHP.js";const l={};function p(d,n){return i(),a("div",null,n[0]||(n[0]=[e(`<div class="hint-container info"><p class="hint-container-title">相关信息</p><p>本页面来自黑马程序员的公开课程:Spring微服务入门的RabbitMQ</p></div><h5 id="下载镜像" tabindex="-1"><a class="header-anchor" href="#下载镜像"><span>下载镜像</span></a></h5><p><code>docker pull rabbitmq:3.13-management</code></p><p><a href="https://hub.docker.com/_/rabbitmq" target="_blank" rel="noopener noreferrer">RabbitMQ镜像地址</a></p><blockquote><p>带management是有图形界面插件的</p></blockquote><h5 id="安装mq" tabindex="-1"><a class="header-anchor" href="#安装mq"><span>安装MQ</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker run \\</span></span>
<span class="line"><span> -e RABBITMQ_DEFAULT_USER=root \\</span></span>
<span class="line"><span> -e RABBITMQ_DEFAULT_PASS=123456 \\</span></span>
<span class="line"><span> -v mq-plugins:/plugins \\</span></span>
<span class="line"><span> --name mq \\</span></span>
<span class="line"><span> --hostname mq1 \\</span></span>
<span class="line"><span> -p 15672:15672 \\</span></span>
<span class="line"><span> -p 5672:5672 \\</span></span>
<span class="line"><span> -d \\</span></span>
<span class="line"><span> rabbitmq:3.13-management</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.rabbitmq.com/docs" target="_blank" rel="noopener noreferrer">参数的意义文档</a></p><h5 id="打开控制台界面" tabindex="-1"><a class="header-anchor" href="#打开控制台界面"><span>打开控制台界面</span></a></h5><p>http://localhost:15672/</p><h5 id="springamqp" tabindex="-1"><a class="header-anchor" href="#springamqp"><span>SpringAMQP</span></a></h5><blockquote><p>SpringAMQP是基于RabbitMQ封装的一套模板，并且还利用SpringBoot对其实现了自动装配，使用起来非常方便<a href="https://spring.io/projects/spring-amqp" target="_blank" rel="noopener noreferrer">SpringAmqp的官方地址</a></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-amqp --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-boot-starter-amqp&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.1.5&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="配置mq地址" tabindex="-1"><a class="header-anchor" href="#配置mq地址"><span>配置MQ地址</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    host: localhost# 主机名</span></span>
<span class="line"><span>    port: 5672 # 端口</span></span>
<span class="line"><span>    virtual-host: / # 虚拟主机</span></span>
<span class="line"><span>    username: root # 用户名</span></span>
<span class="line"><span>    password: 123456 # 密码</span></span>
<span class="line"><span>    listener:</span></span>
<span class="line"><span>      simple:</span></span>
<span class="line"><span>        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="workqueue" tabindex="-1"><a class="header-anchor" href="#workqueue"><span>WorkQueue</span></a></h5><blockquote><p>Work queues，也被称为（Task queues），任务模型。简单来说就是让多个消费者绑定到一个队列，共同消费队列中的消息。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//发送消息</span></span>
<span class="line"><span>rabbitTemplate.convertAndSend(queueName, msg);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//接受消息</span></span>
<span class="line"><span>@RabbitListener(queues = &quot;$queueName&quot;)</span></span>
<span class="line"><span>public void listener(String msg) {</span></span>
<span class="line"><span>    System.out.println(msg);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="发布-订阅" tabindex="-1"><a class="header-anchor" href="#发布-订阅"><span>发布/订阅</span></a></h5><blockquote><ul><li>Publisher：生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）</li></ul></blockquote><ul><li>Exchange：交换机。一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。Exchange有以下3种类型： <ul><li>Fanout：广播，将消息交给所有绑定到交换机的队列</li><li>Direct：定向，把消息交给符合指定routing key 的队列</li><li>Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列</li></ul></li><li>Consumer：消费者，与以前一样，订阅队列，没有变化</li><li>Queue：消息队列也与以前一样，接收消息、缓存消息。</li></ul><blockquote><p>Exchange（交换机）只负责转发消息，不具备存储消息的能力</p></blockquote><h5 id="fanout" tabindex="-1"><a class="header-anchor" href="#fanout"><span>Fanout</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//接收信息</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class FanoutConfig {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 声明交换机</span></span>
<span class="line"><span>     * @return Fanout类型交换机</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public FanoutExchange fanoutExchange(){</span></span>
<span class="line"><span>        return new FanoutExchange(&quot;exchange.fanout&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 第1个队列</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Queue fanoutQueue1(){</span></span>
<span class="line"><span>        return new Queue(&quot;fanout.queue1&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 绑定队列和交换机</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Binding bindingQueue1(Queue fanoutQueue1, FanoutExchange fanoutExchange){</span></span>
<span class="line"><span>        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 第2个队列</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Queue fanoutQueue2(){</span></span>
<span class="line"><span>        return new Queue(&quot;fanout.queue2&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 绑定队列和交换机</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Binding bindingQueue2(Queue fanoutQueue2, FanoutExchange fanoutExchange){</span></span>
<span class="line"><span>        return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//接收消息</span></span>
<span class="line"><span>@RabbitListener(queues = &quot;$queueName&quot;)</span></span>
<span class="line"><span>public void listener(String msg) {</span></span>
<span class="line"><span>    System.out.println(msg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//发送消息</span></span>
<span class="line"><span>rabbitTemplate.convertAndSend(exchangeName, &quot;&quot;, msg);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="direct" tabindex="-1"><a class="header-anchor" href="#direct"><span>Direct</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//接收消息</span></span>
<span class="line"><span>@RabbitListener(bindings = @QueueBinding(</span></span>
<span class="line"><span>    value = @Queue(name = &quot;direct.queue1&quot;),</span></span>
<span class="line"><span>    exchange = @Exchange(name = &quot;exchange.direct&quot;, type = ExchangeTypes.DIRECT),</span></span>
<span class="line"><span>    key = {&quot;red&quot;, &quot;blue&quot;}</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>public void listener(String msg){</span></span>
<span class="line"><span>    System.out.println(msg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//发送消息</span></span>
<span class="line"><span>rabbitTemplate.convertAndSend(exchangeName, key, message);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="topic" tabindex="-1"><a class="header-anchor" href="#topic"><span>Topic</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//接收消息</span></span>
<span class="line"><span>@RabbitListener(bindings = @QueueBinding(</span></span>
<span class="line"><span>    value = @Queue(name = &quot;topic.queue1&quot;),</span></span>
<span class="line"><span>    exchange = @Exchange(name = &quot;exchange.direct&quot;, type = ExchangeTypes.DIRECT),</span></span>
<span class="line"><span>    key = &quot;key&quot;</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>public void listener(String msg){</span></span>
<span class="line"><span>    System.out.println(msg);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//发送消息</span></span>
<span class="line"><span>rabbitTemplate.convertAndSend(exchangeName, key, message);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="配置json转换器" tabindex="-1"><a class="header-anchor" href="#配置json转换器"><span>配置JSON转换器</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>     &lt;groupId&gt;com.fasterxml.jackson.dataformat&lt;/groupId&gt;</span></span>
<span class="line"><span>     &lt;artifactId&gt;jackson-dataformat-xml&lt;/artifactId&gt;</span></span>
<span class="line"><span>     &lt;version&gt;2.9.10&lt;/version&gt;</span></span>
<span class="line"><span> &lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Bean</span></span>
<span class="line"><span>public MessageConverter jsonMessageConverter(){</span></span>
<span class="line"><span>    return new Jackson2JsonMessageConverter();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="消息的可靠性" tabindex="-1"><a class="header-anchor" href="#消息的可靠性"><span>消息的可靠性</span></a></h5><blockquote><p>RabbitMQ提供了publisher confirm机制来避免消息发送到MQ过程中丢失。这种机制必须给每个消息指定一个唯一ID。消息发送到MQ以后，会返回一个结果给发送者，表示消息是否处理成功。</p></blockquote><p>返回结果有两种方式：</p><ul><li>publisher-confirm，发送者确认 <ul><li>消息成功投递到交换机，返回ack</li><li>消息未投递到交换机，返回nack</li></ul></li><li>publisher-return，发送者回执 <ul><li>消息投递到交换机了，但是没有路由到队列。返回ACK，及路由失败原因。</li></ul></li></ul><h6 id="生产者消息确认" tabindex="-1"><a class="header-anchor" href="#生产者消息确认"><span>生产者消息确认</span></a></h6><p>添加配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    publisher-confirm-type: correlated</span></span>
<span class="line"><span>    publisher-returns: true</span></span>
<span class="line"><span>    template:</span></span>
<span class="line"><span>      mandatory: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>publish-confirm-type</code>：开启publisher-confirm，这里支持两种类型：</p><ul><li><code>simple</code>：同步等待confirm结果，直到超时</li><li><code>correlated</code>：异步回调，定义ConfirmCallback，MQ返回结果时会回调这个ConfirmCallback</li></ul></li><li><p><code>publish-returns</code>：开启publish-return功能，同样是基于callback机制，不过是定义ReturnCallback</p></li><li><p><code>template.mandatory</code>：定义消息路由失败时的策略。true，则调用ReturnCallback；false：则直接丢弃消息</p></li></ul><p>定义Return回调</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class CommonConfig implements ApplicationContextAware {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {</span></span>
<span class="line"><span>        RabbitTemplate rabbitTemplate = applicationContext.getBean(RabbitTemplate.class);</span></span>
<span class="line"><span>        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -&gt; {</span></span>
<span class="line"><span>            log.info(&quot;消息发送失败，应答码{}，原因{}，交换机{}，路由键{},消息{}&quot;,</span></span>
<span class="line"><span>                     replyCode, replyText, exchange, routingKey, message.toString());</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义ConfirmCallback</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString())	</span></span>
<span class="line"><span>    correlationData.getFuture().addCallback(</span></span>
<span class="line"><span>        result -&gt; {</span></span>
<span class="line"><span>            if(result.isAck()){</span></span>
<span class="line"><span>                log.debug(&quot;消息发送成功, ID:{}&quot;, correlationData.getId());</span></span>
<span class="line"><span>            }else{</span></span>
<span class="line"><span>                log.error(&quot;消息发送失败, ID:{}, 原因{}&quot;,correlationData.getId(), result.getReason());</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        ex -&gt; log.error(&quot;消息发送异常, ID:{}, 原因{}&quot;,correlationData.getId(),ex.getMessage())</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    rabbitTemplate.convertAndSend(exchangeName, bindingKey, msg, correlationData);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="mq持久化" tabindex="-1"><a class="header-anchor" href="#mq持久化"><span>MQ持久化</span></a></h5><p>交换机持久化</p><div class="language-@bean line-numbers-mode" data-highlighter="shiki" data-ext="@bean" data-title="@bean" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public DirectExchange simpleExchange(){</span></span>
<span class="line"><span>    // 三个参数：交换机名称、是否持久化、当没有queue与其绑定时是否自动删除</span></span>
<span class="line"><span>    return new DirectExchange(&quot;simple.direct&quot;, true, false);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>队列持久化</p><div class="language-@bean line-numbers-mode" data-highlighter="shiki" data-ext="@bean" data-title="@bean" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public Queue simpleQueue(){</span></span>
<span class="line"><span>    // 使用QueueBuilder构建队列，durable就是持久化的</span></span>
<span class="line"><span>    return QueueBuilder.durable(&quot;simple.queue&quot;).build();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消息持久化</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Message message = MessageBuilder</span></span>
<span class="line"><span>        .withBody(&quot;hello&quot;.getBytes(StandardCharsets.UTF_8))</span></span>
<span class="line"><span>        .setDeliveryMode(MessageDeliveryMode.PERSISTENT)</span></span>
<span class="line"><span>        .build();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="消费者确认机制" tabindex="-1"><a class="header-anchor" href="#消费者确认机制"><span>消费者确认机制</span></a></h5><blockquote><p>SpringAMQP则允许配置三种确认模式：</p></blockquote><ul><li>manual：手动ack，需要在业务代码结束后，调用api发送ack。</li><li>auto：自动ack，由spring监测listener代码是否出现异常，没有异常则返回ack；抛出异常则返回nack</li><li>none：关闭ack，MQ假定消费者获取消息后会成功处理，因此消息投递后立即被删除</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    listener:</span></span>
<span class="line"><span>      simple:</span></span>
<span class="line"><span>        acknowledge-mode: autp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="失败重试机制" tabindex="-1"><a class="header-anchor" href="#失败重试机制"><span>失败重试机制</span></a></h5><p>本地重试</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    listener:</span></span>
<span class="line"><span>      simple:</span></span>
<span class="line"><span>        retry:</span></span>
<span class="line"><span>          enabled: true # 开启消费者失败重试</span></span>
<span class="line"><span>          initial-interval: 1000 # 初识的失败等待时长为1秒</span></span>
<span class="line"><span>          multiplier: 1 # 失败的等待时长倍数，下次等待时长 = multiplier * last-interval</span></span>
<span class="line"><span>          max-attempts: 3 # 最大重试次数</span></span>
<span class="line"><span>          stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>失败策略</p><p>在开启重试模式后，重试次数耗尽，如果消息依然失败，则需要有MessageRecovery接口来处理，它包含三种不同的实现：</p><ul><li>RejectAndDontRequeueRecoverer：重试耗尽后，直接reject，丢弃消息。默认就是这种方式</li><li>ImmediateRequeueMessageRecoverer：重试耗尽后，返回nack，消息重新入队</li><li>RepublishMessageRecoverer：重试耗尽后，将失败消息投递到指定的交换机</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class ErrorMessageConfig {</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public DirectExchange errorMessageExchange(){</span></span>
<span class="line"><span>        return new DirectExchange(&quot;error.direct&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Queue errorQueue(){</span></span>
<span class="line"><span>        return new Queue(&quot;error.queue&quot;, true);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public Binding errorBinding(Queue errorQueue, DirectExchange errorMessageExchange){</span></span>
<span class="line"><span>        return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with(&quot;error&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){</span></span>
<span class="line"><span>        return new RepublishMessageRecoverer(rabbitTemplate, &quot;error.direct&quot;, &quot;error&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="如何确保rabbitmq消息的可靠性" tabindex="-1"><a class="header-anchor" href="#如何确保rabbitmq消息的可靠性"><span>如何确保RabbitMQ消息的可靠性？</span></a></h5><ul><li>开启生产者确认机制，确保生产者的消息能到达队列</li><li>开启持久化功能，确保消息未消费前在队列中不会丢失</li><li>开启消费者确认机制为auto，由spring确认消息处理成功后完成ack</li><li>开启消费者失败重试机制，并设置MessageRecoverer，多次重试失败后将消息投递到异常交换机，交由人工处理</li></ul><h5 id="死信交换机" tabindex="-1"><a class="header-anchor" href="#死信交换机"><span>死信交换机</span></a></h5><blockquote><p>如果这个包含死信的队列配置了<code>dead-letter-exchange</code>属性，指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机称为<strong>死信交换机</strong>（Dead Letter Exchange，检查DLX）。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 声明普通的 simple.queue队列，并且为其指定死信交换机：dl.direct</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public Queue simpleQueue2(){</span></span>
<span class="line"><span>    return QueueBuilder.durable(&quot;simple.queue&quot;) // 指定队列名称，并持久化</span></span>
<span class="line"><span>        .deadLetterExchange(&quot;dl.direct&quot;) // 指定死信交换机</span></span>
<span class="line"><span>        .build();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 声明死信交换机 dl.direct</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public DirectExchange dlExchange(){</span></span>
<span class="line"><span>    return new DirectExchange(&quot;dl.direct&quot;, true, false);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 声明存储死信的队列 dl.queue</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public Queue dlQueue(){</span></span>
<span class="line"><span>    return new Queue(&quot;dl.queue&quot;, true);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 将死信队列 与 死信交换机绑定</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public Binding dlBinding(){</span></span>
<span class="line"><span>    return BindingBuilder.bind(dlQueue()).to(dlExchange()).with(&quot;simple&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>什么样的消息会成为死信？</p><ul><li>消息被消费者reject或者返回nack</li><li>消息超时未消费</li><li>队列满了</li></ul><p>死信交换机的使用场景是什么？</p><ul><li>如果队列绑定了死信交换机，死信会投递到死信交换机；</li><li>可以利用死信交换机收集所有消费者处理失败的消息（死信），交由人工处理，进一步提高消息队列的可靠性。</li></ul><h5 id="延迟队列" tabindex="-1"><a class="header-anchor" href="#延迟队列"><span>延迟队列</span></a></h5><p>消费者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@RabbitListener(bindings = @QueueBinding(</span></span>
<span class="line"><span>    value = @Queue(name = &quot;dl.ttl.queue&quot;, durable = &quot;true&quot;),</span></span>
<span class="line"><span>    exchange = @Exchange(name = &quot;dl.ttl.direct&quot;),</span></span>
<span class="line"><span>    key = &quot;ttl&quot;</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>public void listenDlQueue(String msg){</span></span>
<span class="line"><span>    log.info(&quot;接收到 dl.ttl.queue的延迟消息：{}&quot;, msg);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建交换机队列，并绑定，设置TTL</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Bean</span></span>
<span class="line"><span>public Queue ttlQueue(){</span></span>
<span class="line"><span>    return QueueBuilder.durable(&quot;ttl.queue&quot;) // 指定队列名称，并持久化</span></span>
<span class="line"><span>        .ttl(10000) // 设置队列的超时时间，10秒</span></span>
<span class="line"><span>        .deadLetterExchange(&quot;dl.ttl.direct&quot;) // 指定死信交换机</span></span>
<span class="line"><span>        .build();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public DirectExchange ttlExchange(){</span></span>
<span class="line"><span>    return new DirectExchange(&quot;ttl.direct&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public Binding ttlBinding(){</span></span>
<span class="line"><span>    return BindingBuilder.bind(ttlQueue()).to(ttlExchange()).with(&quot;ttl&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生产者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 创建消息</span></span>
<span class="line"><span>    String message = &quot;hello, ttl queue&quot;;</span></span>
<span class="line"><span>    // 消息ID，需要封装到CorrelationData中</span></span>
<span class="line"><span>    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());</span></span>
<span class="line"><span>    // 发送消息</span></span>
<span class="line"><span>    rabbitTemplate.convertAndSend(&quot;ttl.direct&quot;, &quot;ttl&quot;, message, correlationData);</span></span>
<span class="line"><span>    // 记录日志</span></span>
<span class="line"><span>    log.debug(&quot;发送消息成功&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在生产者中设置TTL</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testTTLMsg() {</span></span>
<span class="line"><span>    // 创建消息</span></span>
<span class="line"><span>    Message message = MessageBuilder</span></span>
<span class="line"><span>        .withBody(&quot;hello, ttl message&quot;.getBytes(StandardCharsets.UTF_8))</span></span>
<span class="line"><span>        .setExpiration(&quot;5000&quot;)</span></span>
<span class="line"><span>        .build();</span></span>
<span class="line"><span>    // 消息ID，需要封装到CorrelationData中</span></span>
<span class="line"><span>    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());</span></span>
<span class="line"><span>    // 发送消息</span></span>
<span class="line"><span>    rabbitTemplate.convertAndSend(&quot;ttl.direct&quot;, &quot;ttl&quot;, message, correlationData);</span></span>
<span class="line"><span>    log.debug(&quot;发送消息成功&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消息超时的两种方式是？</p><ul><li>给队列设置ttl属性，进入队列后超过ttl时间的消息变为死信</li><li>给消息设置ttl属性，队列接收到消息超过ttl时间后变为死信</li></ul><p>如何实现发送一个消息20秒后消费者才收到消息？</p><ul><li>给消息的目标队列指定死信交换机</li><li>将消费者监听的队列绑定到死信交换机</li><li>发送消息时给消息设置超时时间为20秒</li></ul><hr><p>安装DelayExchange插件</p><p><a href="https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq" target="_blank" rel="noopener noreferrer">官方的安装指南地址</a></p><p><a href="https://www.rabbitmq.com/community-plugins.html" target="_blank" rel="noopener noreferrer">官方的插件社区</a></p><p><a href="https://github.com/rabbitmq/rabbitmq-delayed-message-exchange" target="_blank" rel="noopener noreferrer">GitHub页面</a></p><p>安装后放入容器数据卷中</p><p><code>docker exec -it mq bash</code></p><p><code>rabbitmq-plugins enable rabbitmq_delayed_message_exchange</code></p><p>消费者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@RabbitListener(bindings = @QueueBinding(</span></span>
<span class="line"><span>    value = @Queue(name = &quot;delay.queue&quot;, delayed = &quot;true&quot;),</span></span>
<span class="line"><span>    exchange = @Exchange(name = &quot;dl.ttl.direct&quot;),</span></span>
<span class="line"><span>    key = &quot;delay&quot;</span></span>
<span class="line"><span>))</span></span>
<span class="line"><span>public void listenDlQueue(String msg){</span></span>
<span class="line"><span>    log.info(&quot;接收到 dl.ttl.queue的延迟消息：{}&quot;, msg);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建交换机队列，并绑定</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Bean</span></span>
<span class="line"><span>public Queue delayedQueue() {</span></span>
<span class="line"><span>        return new Queue(&quot;delay.queue&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public DirectExchange delayedExchange(){</span></span>
<span class="line"><span>    return ExchangeBuilder</span></span>
<span class="line"><span>    .directExchange(&quot;delay.direct&quot;)</span></span>
<span class="line"><span>    .durable(true)</span></span>
<span class="line"><span>    .build();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@Bean</span></span>
<span class="line"><span>public Binding delayedBinding(){</span></span>
<span class="line"><span>    return BindingBuilder.bind(delayedQueue()).to(delayedExchange()).with(&quot;delay&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生产者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    // 创建消息</span></span>
<span class="line"><span>    Message message = MessageBuilder</span></span>
<span class="line"><span>        .withBody(&quot;hello, dalyed message&quot;.getBytes(StandardCharsets.UTF_8))</span></span>
<span class="line"><span>            .setHeader(&quot;X-delay,1000)</span></span>
<span class="line"><span>            .build();</span></span>
<span class="line"><span>    // 消息ID，需要封装到CorrelationData中</span></span>
<span class="line"><span>    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());</span></span>
<span class="line"><span>    // 发送消息</span></span>
<span class="line"><span>    rabbitTemplate.convertAndSend(&quot;delay.direct&quot;, &quot;delay&quot;, message, correlationData);</span></span>
<span class="line"><span>    log.debug(&quot;发送消息成功&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延迟队列插件的使用步骤包括哪些？</p><p>•声明一个交换机，添加delayed属性为true</p><p>•发送消息时，添加x-delay头，值为超时时间</p>`,100)]))}const c=s(l,[["render",p],["__file","rabbitmq_note_1.html.vue"]]),u=JSON.parse('{"path":"/notes/database/d_messageQueue/rabbitmq_note_1.html","title":"RabbitMQ","lang":"zh-CN","frontmatter":{"icon":"","description":"相关信息 本页面来自黑马程序员的公开课程:Spring微服务入门的RabbitMQ 下载镜像 docker pull rabbitmq:3.13-management RabbitMQ镜像地址 带management是有图形界面插件的 安装MQ 参数的意义文档 打开控制台界面 http://localhost:15672/ SpringAMQP Spr...","title":"RabbitMQ","date":"2024-09-16T00:00:00.000Z","category":["消息中间件"],"tag":["RabbitMQ"],"head":[["meta",{"property":"og:url","content":"https://he9.xin/notes/database/d_messageQueue/rabbitmq_note_1.html"}],["meta",{"property":"og:site_name","content":"春风不语即随本心"}],["meta",{"property":"og:title","content":"RabbitMQ"}],["meta",{"property":"og:description","content":"相关信息 本页面来自黑马程序员的公开课程:Spring微服务入门的RabbitMQ 下载镜像 docker pull rabbitmq:3.13-management RabbitMQ镜像地址 带management是有图形界面插件的 安装MQ 参数的意义文档 打开控制台界面 http://localhost:15672/ SpringAMQP Spr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-04T15:03:48.000Z"}],["meta",{"property":"article:author","content":"ErenJaegerKing"}],["meta",{"property":"article:tag","content":"RabbitMQ"}],["meta",{"property":"article:published_time","content":"2024-09-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-04T15:03:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RabbitMQ\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-04T15:03:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ErenJaegerKing\\",\\"url\\":\\"https://he9.xin\\",\\"email\\":\\"erenjaegerking@qq.com\\"}]}"]]},"headers":[],"git":{"createdTime":1726904675000,"updatedTime":1733324628000,"contributors":[{"name":"LiYaoYu","email":"ErenJaegerKing@qq.com","commits":1},{"name":"erenjaeger","email":"ErenJaegerKing@qq.com","commits":1}]},"readingTime":{"minutes":8.65,"words":2595},"filePathRelative":"notes/database/d_messageQueue/rabbitmq_note_1.md","localizedDate":"2024年9月16日","excerpt":"<div class=\\"hint-container info\\">\\n<p class=\\"hint-container-title\\">相关信息</p>\\n<p>本页面来自黑马程序员的公开课程:Spring微服务入门的RabbitMQ</p>\\n</div>\\n<h5>下载镜像</h5>\\n<p><code>docker pull rabbitmq:3.13-management</code></p>\\n<p><a href=\\"https://hub.docker.com/_/rabbitmq\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">RabbitMQ镜像地址</a></p>","autoDesc":true}');export{c as comp,u as data};
