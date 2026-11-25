'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const tabs=document.querySelector('.activity-tabs');
function activateActivity(index,focus=false){
 const item=activities[index];
 tabs.querySelectorAll('button').forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
 const photo=document.querySelector('#activity-photo');photo.src=''+item[1]+'.webp';photo.alt='Atividade de '+item[0]+' da Escola Modelo Cristão';
 document.querySelector('#activity-name').textContent=item[0].toLocaleUpperCase('pt-BR');
 document.querySelector('#activity-title').textContent=item[2];document.querySelector('#activity-description').textContent=item[3];
 document.querySelector('#activity-panel').setAttribute('aria-labelledby','activity-tab-'+index);
 if(focus)tabs.children[index].focus();
}
activities.forEach((activity,index)=>{const button=document.createElement('button');button.type='button';button.id='activity-tab-'+index;button.setAttribute('role','tab');button.setAttribute('aria-controls','activity-panel');button.textContent=activity[0];button.addEventListener('click',()=>activateActivity(index));button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%activities.length;else if(event.key==='ArrowLeft')next=(index+activities.length-1)%activities.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=activities.length-1;else return;event.preventDefault();activateActivity(next,true);});tabs.append(button);});
activateActivity(0);
const dialog=document.querySelector('#lightbox');
let photoTrigger=null;
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{photoTrigger=button;const image=dialog.querySelector('img');image.src=''+button.dataset.photo+'.webp';image.alt=button.dataset.caption;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>photoTrigger?.focus());
document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const status=document.querySelector('#form-status');status.hidden=false;status.textContent='Esta é uma prévia de apresentação. Nenhuma mensagem foi enviada.';});

document.querySelector('.mission-link').addEventListener('click',()=>{document.querySelector('#missao').open=true;});
const testimonials=[
 {quote:'… papel fundamental em minha formação pessoal e espiritual.',author:'Marcia Miluzzi Pacheco',role:'Ex-aluna da EMC e mãe de aluna'},
 {quote:'… profissionais muito dedicados ao cuidado diário dos nossos filhos.',author:'Família Quina',role:'Família da comunidade EMC'},
 {quote:'… acolheu nosso filho com muito carinho.',author:'Família Colletti',role:'Família da comunidade EMC'}
];
const testimonialSection=document.querySelector('.testimonial-shell');
const testimonialDots=document.querySelector('.testimonial-dots');
const pauseTestimonials=document.querySelector('.testimonial-pause');
let testimonialIndex=0;
let testimonialPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let testimonialVisible=false;
let testimonialHover=false;
let testimonialFocus=false;
function showTestimonial(index){
 testimonialIndex=(index+testimonials.length)%testimonials.length;
 const item=testimonials[testimonialIndex];
 document.querySelector('#testimonial-quote').textContent=item.quote;
 document.querySelector('#testimonial-author').textContent=item.author;
 document.querySelector('#testimonial-role').textContent=item.role;
 testimonialDots.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===testimonialIndex)));
}
function updatePauseControl(){pauseTestimonials.textContent=testimonialPaused?'Reproduzir':'Pausar';pauseTestimonials.setAttribute('aria-label',testimonialPaused?'Iniciar rotação dos depoimentos':'Pausar rotação dos depoimentos');}
testimonials.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','Mostrar depoimento de '+item.author);button.addEventListener('click',()=>showTestimonial(i));testimonialDots.append(button);});
document.querySelector('.testimonial-prev').addEventListener('click',()=>showTestimonial(testimonialIndex-1));
document.querySelector('.testimonial-next').addEventListener('click',()=>showTestimonial(testimonialIndex+1));
pauseTestimonials.addEventListener('click',()=>{testimonialPaused=!testimonialPaused;updatePauseControl();});
testimonialSection.addEventListener('mouseenter',()=>{testimonialHover=true;});
testimonialSection.addEventListener('mouseleave',()=>{testimonialHover=false;});
testimonialSection.addEventListener('focusin',()=>{testimonialFocus=true;});
testimonialSection.addEventListener('focusout',()=>{testimonialFocus=testimonialSection.contains(document.activeElement);requestAnimationFrame(()=>{testimonialFocus=testimonialSection.contains(document.activeElement);});});
new IntersectionObserver(entries=>{testimonialVisible=entries[0].isIntersecting;},{threshold:.3}).observe(testimonialSection);
setInterval(()=>{if(testimonialVisible&&!testimonialPaused&&!testimonialHover&&!testimonialFocus&&!document.hidden)showTestimonial(testimonialIndex+1);},7000);
showTestimonial(0);updatePauseControl();
