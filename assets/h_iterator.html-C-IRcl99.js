import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,e,o as a}from"./app-CmLuyXBJ.js";const n={};function r(l,i){return a(),s("div",null,i[0]||(i[0]=[e(`<hr><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>设计模式-行为型模式-迭代器模式</p></div><hr><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义"><span>定义</span></a></h3><p>提供<strong>一个对象</strong>来<strong>顺序访问聚合对象</strong>中的<strong>一系列数据</strong>，而<strong>不暴露聚合对象</strong>的<strong>内部表示</strong>。</p><h3 id="结构" tabindex="-1"><a class="header-anchor" href="#结构"><span>结构</span></a></h3><p>迭代器模式主要包含以下角色：</p><ul><li><strong>抽象聚合（Aggregate）角色</strong>：定义存储、添加、删除聚合元素以及创建迭代器对象的接口。</li><li><strong>具体聚合（ConcreteAggregate）角色</strong>：实现抽象聚合类，返回一个具体迭代器的实例。</li><li><strong>抽象迭代器（Iterator）角色</strong>：定义访问和遍历聚合元素的接口，通常包含 hasNext()、next() 等方法。</li><li><strong>具体迭代器（Concretelterator）角色</strong>：实现抽象迭代器接口中所定义的方法，完成对聚合对象的遍历，记录遍历的当前位置。</li></ul><h3 id="uml" tabindex="-1"><a class="header-anchor" href="#uml"><span>UML</span></a></h3><figure><img src="https://drawingbed-686.pages.dev/myblog/202411071017391.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="案例实现" tabindex="-1"><a class="header-anchor" href="#案例实现"><span>案例实现</span></a></h3><p>【例】定义一个可以存储学生对象的容器对象，将遍历该容器的功能交由迭代器实现，涉及到的类如下：</p><figure><img src="https://drawingbed-686.pages.dev/myblog/202411071017428.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点"><span><strong>优缺点</strong></span></a></h3><p><strong>优点：</strong></p><ul><li><p><strong>以不同的方式遍历一个聚合对象</strong></p><p>它支持以不同的方式遍历一个聚合对象，在同一个聚合对象上可以定义多种遍历方式。在迭代器模式中只需要用一个不同的迭代器来替换原有迭代器即可改变遍历算法，我们也可以自己定义迭代器的子类以支持新的遍历方式。</p></li><li><p><strong>迭代器简化了聚合类</strong></p><p>由于引入了迭代器，在原有的聚合对象中不需要再自行提供数据遍历等方法，这样可以简化聚合类的设计。</p></li><li><p><strong>满足 “开闭原则” 的要求</strong></p><p>在迭代器模式中，由于引入了抽象层，增加新的聚合类和迭代器类都很方便，无须修改原有代码。</p></li></ul><p><strong>缺点：</strong></p><ul><li><p><strong>增加了系统的复杂性</strong></p><p>增加了类的个数，这在一定程度上增加了系统的复杂性。</p></li></ul><h3 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景</span></a></h3><ul><li>当需要为<strong>聚合对象提供多种遍历方式</strong>时。</li><li>当需要为<strong>遍历不同的聚合结构</strong>提供<strong>一个统一的接口</strong>时。</li><li>当<strong>访问</strong>一个<strong>聚合对象</strong>的内容而<strong>无须暴露</strong>其<strong>内部细节</strong>的表示时。</li></ul><h3 id="jdk源码解析" tabindex="-1"><a class="header-anchor" href="#jdk源码解析"><span>JDK源码解析</span></a></h3><p>迭代器模式在JAVA的很多集合类中被广泛应用，接下来看看JAVA源码中是如何使用迭代器模式的。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">List</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> list </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ArrayList</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Iterator</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> iterator </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">iterator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">iterator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">hasNext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">iterator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>List：抽象聚合类</li><li>ArrayList：具体的聚合类</li><li>Iterator：抽象迭代器</li><li>list.iterator()：返回的是实现了 <code>Iterator</code> 接口的具体迭代器对象</li></ul><figure><img src="https://drawingbed-686.pages.dev/myblog/202411071018993.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Itr是一个内部类，它实现了 <code>Iterator</code> 接口并重写了其中的抽象方法。</p><figure><img src="https://drawingbed-686.pages.dev/myblog/202411071018977.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 <code>iterator</code> 方法中返回了一个实例化的 <code>Iterator</code> 对象。Itr是一个内部类，它实现了 <code>Iterator</code> 接口并重写了其中的抽象方法。</p><figure><img src="https://drawingbed-686.pages.dev/myblog/202411071018389.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>注意：当我们在使用JAVA开发的时候，想使用迭代器模式的话，只要让我们自己定义的容器类实现</p><p><code>java.util.Iterable</code>并实现其中的iterator()方法使其返回一个 <code>java.util.Iterator</code> 的实现类就可以了。</p>`,31)]))}const o=t(n,[["render",r],["__file","h_iterator.html.vue"]]),h=JSON.parse('{"path":"/notes/designPattern/d_behavioral/h_iterator.html","title":"迭代器模式","lang":"zh-CN","frontmatter":{"icon":"","description":"相关信息 设计模式-行为型模式-迭代器模式 定义 提供一个对象来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示。 结构 迭代器模式主要包含以下角色： 抽象聚合（Aggregate）角色：定义存储、添加、删除聚合元素以及创建迭代器对象的接口。 具体聚合（ConcreteAggregate）角色：实现抽象聚合类，返回一个具体迭代器的实例。 抽象...","title":"迭代器模式","date":"2024-11-07T00:00:00.000Z","category":["设计模式"],"tag":["行为型模式","迭代器模式"],"order":8,"head":[["meta",{"property":"og:url","content":"https://ErenJaegerKing.github.io/notes/designPattern/d_behavioral/h_iterator.html"}],["meta",{"property":"og:site_name","content":"ErenJaeger"}],["meta",{"property":"og:title","content":"迭代器模式"}],["meta",{"property":"og:description","content":"相关信息 设计模式-行为型模式-迭代器模式 定义 提供一个对象来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示。 结构 迭代器模式主要包含以下角色： 抽象聚合（Aggregate）角色：定义存储、添加、删除聚合元素以及创建迭代器对象的接口。 具体聚合（ConcreteAggregate）角色：实现抽象聚合类，返回一个具体迭代器的实例。 抽象..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://drawingbed-686.pages.dev/myblog/202411071017391.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-07T02:19:28.000Z"}],["meta",{"property":"article:author","content":"ErenJaegerKing"}],["meta",{"property":"article:tag","content":"行为型模式"}],["meta",{"property":"article:tag","content":"迭代器模式"}],["meta",{"property":"article:published_time","content":"2024-11-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-07T02:19:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"迭代器模式\\",\\"image\\":[\\"https://drawingbed-686.pages.dev/myblog/202411071017391.png\\",\\"https://drawingbed-686.pages.dev/myblog/202411071017428.png\\",\\"https://drawingbed-686.pages.dev/myblog/202411071018993.png\\",\\"https://drawingbed-686.pages.dev/myblog/202411071018977.png\\",\\"https://drawingbed-686.pages.dev/myblog/202411071018389.png\\"],\\"datePublished\\":\\"2024-11-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-07T02:19:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ErenJaegerKing\\",\\"url\\":\\"https://ErenJaegerKing.github.io\\",\\"email\\":\\"erenjaegerking@qq.com\\"}]}"]]},"headers":[{"level":3,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":3,"title":"结构","slug":"结构","link":"#结构","children":[]},{"level":3,"title":"UML","slug":"uml","link":"#uml","children":[]},{"level":3,"title":"案例实现","slug":"案例实现","link":"#案例实现","children":[]},{"level":3,"title":"优缺点","slug":"优缺点","link":"#优缺点","children":[]},{"level":3,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":3,"title":"JDK源码解析","slug":"jdk源码解析","link":"#jdk源码解析","children":[]}],"git":{"createdTime":1730806731000,"updatedTime":1730945968000,"contributors":[{"name":"LiYaoYu","email":"ErenJaegerKing@qq.com","commits":2}]},"readingTime":{"minutes":2.78,"words":835},"filePathRelative":"notes/designPattern/d_behavioral/h_iterator.md","localizedDate":"2024年11月7日","excerpt":"<hr>\\n<div class=\\"hint-container info\\">\\n<p class=\\"hint-container-title\\">相关信息</p>\\n<p>设计模式-行为型模式-迭代器模式</p>\\n</div>\\n<hr>\\n<h3>定义</h3>\\n<p>提供<strong>一个对象</strong>来<strong>顺序访问聚合对象</strong>中的<strong>一系列数据</strong>，而<strong>不暴露聚合对象</strong>的<strong>内部表示</strong>。</p>\\n<h3>结构</h3>\\n<p>迭代器模式主要包含以下角色：</p>\\n<ul>\\n<li><strong>抽象聚合（Aggregate）角色</strong>：定义存储、添加、删除聚合元素以及创建迭代器对象的接口。</li>\\n<li><strong>具体聚合（ConcreteAggregate）角色</strong>：实现抽象聚合类，返回一个具体迭代器的实例。</li>\\n<li><strong>抽象迭代器（Iterator）角色</strong>：定义访问和遍历聚合元素的接口，通常包含 hasNext()、next() 等方法。</li>\\n<li><strong>具体迭代器（Concretelterator）角色</strong>：实现抽象迭代器接口中所定义的方法，完成对聚合对象的遍历，记录遍历的当前位置。</li>\\n</ul>","autoDesc":true}');export{o as comp,h as data};