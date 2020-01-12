import $ from "jQuery";

export default {
  data() {
    return {
      menuChecker: {
        $menu: null,
        checkerClasses: {
          open: "header__menu_checker-open",
          close: "header__menu_checker-close"
        },
        menuClasses: {
          item: "menu__link",
          opened: "header__menu-opened",
          hidden: "header__menu-hidden",
          visibleBg: "header__menu-visible_bg",
          visibleMenuItem: "menu__link-visible"
        },
        delay: 700,
        itemDelay: 200
        // process: false
      }
    };
  },
  mounted() {
    const $vm = this;
    let {
      $menu,
      checkerClasses,
      menuClasses,
      delay,
      itemDelay
      // process
    } = $vm.menuChecker;

    $(document).ready(() => {
      $menu = $("#main_menu");

      $("#menu_checker").click(function(event) {
        event.preventDefault();

        // if (process) {
        //   return;
        // }

        let $checker = $(this);
        console.log(checkerClasses);

        if ($checker.hasClass(checkerClasses.open)) {
          itemDelay = 200;

          $menu
            .queue(function() {
              $checker.toggleClass(
                `${checkerClasses.open} ${checkerClasses.close}`
              );
              $(this).dequeue();
            })
            .queue(function() {
              $menu.addClass(menuClasses.opened);
              $(this).dequeue();
            })
            .delay(100)
            .queue(function() {
              $menu.addClass(menuClasses.visibleBg);
              $(this).dequeue();
            })
            .delay(delay)
            .queue(function() {
              var delay = 0;

              $menu.find("." + menuClasses.item).each(function() {
                $(this)
                  .delay(delay)
                  .queue(function() {
                    $(this).addClass(menuClasses.visibleMenuItem);
                    $(this).dequeue();
                  });

                delay += itemDelay;
              });
              $(this).dequeue();
            });
        } else if ($checker.hasClass(checkerClasses.close)) {
          itemDelay = 100;

          $menu
            .queue(function() {
              $checker.toggleClass(
                `${checkerClasses.close} ${checkerClasses.open}`
              );
              $(this).dequeue();
            })
            .queue(function() {
              var delay = 0;

              $menu.find("." + menuClasses.item).each(function() {
                $(this)
                  .delay(delay)
                  .queue(function() {
                    $(this).removeClass(menuClasses.visibleMenuItem);
                    $(this).dequeue();
                  });

                delay += itemDelay;
              });
              $(this).dequeue();
            })
            .delay(delay + itemDelay)
            .queue(function() {
              $menu.addClass(menuClasses.hidden);
              $(this).dequeue();
            })
            .delay(delay)
            .queue(function() {
              $menu.removeClass(`
              ${menuClasses.visibleBg}
              ${menuClasses.opened}
              ${menuClasses.hidden}
            `);
              $(this).dequeue();
            });
        }

        // process = false;
      });
    });
  }
};
